from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Hijo, Autorizado

api = Blueprint('api', __name__)

# Rutas de Usuarios

@api.route('/registro', methods=['POST'])
def handle_registro():
    body = request.get_json()
    if body is None: return jsonify({"msg": "No se recibió información"}), 400
    nuevo_usuario = User(
        email=body['email'], password=body['password'], nombre=body['nombre'],
        apellidos=body['apellidos'], edad=body['edad'], direccion_hogar=body.get('direccionHogar'),
        direccion_trabajo=body.get('direccionTrabajo'), telefono=body.get('telefonoCompleto'),
        foto_perfil=body.get('fotoPerfil'), is_active=True
    )
    db.session.add(nuevo_usuario)
    try:
        db.session.commit()
        return jsonify({"msg": "Usuario creado con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error", "error": str(e)}), 500

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    user = User.query.filter_by(email=body['email'], password=body['password']).first()
    if user is None: return jsonify({"msg": "Error"}), 401
    return jsonify({"msg": "Login exitoso", "user": user.serialize()}), 200

# Rutas para Hijos

@api.route('/hijos', methods=['POST'])
def add_hijo():
    body = request.get_json()    
    datos_medicos = body.get("datosMedicos", {})
    desarrollo = body.get("desarrollo", {})
    nuevo_hijo = Hijo(
        nombre=body['nombre'], apellido=body['apellido'], edad=body['edad'],
        foto_url=body.get('fotoUrl'), info_adicional=body.get('info'),        
        intolerancia=datos_medicos.get('intolerancia'), alergia=datos_medicos.get('alergia'),
        asma=datos_medicos.get('asma'), tipo_sangre=datos_medicos.get('tipoSangre'),       
        gatea=desarrollo.get('gatea'), autonomia_bano=desarrollo.get('autonomiaBano'),
        user_id=body['user_id']
    )
    db.session.add(nuevo_hijo)
    try:
        db.session.commit()
        return jsonify({"msg": "Hijo registrado", "hijo": nuevo_hijo.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error", "error": str(e)}), 500

@api.route('/hijos/<int:hijo_id>', methods=['DELETE'])
def delete_hijo(hijo_id):
    hijo = Hijo.query.get(hijo_id)
    if not hijo:
        return jsonify({"msg": "Hijo no encontrado"}), 404
    
    try:
        # Borrado en cascada manual de autorizados
        Autorizado.query.filter_by(hijo_id=hijo_id).delete()
        db.session.delete(hijo)
        db.session.commit()
        return jsonify({"msg": "Hijo y sus autorizados eliminados"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar", "error": str(e)}), 500

# Rutas para Autorizados

@api.route('/autorizados', methods=['POST'])
def add_autorizado():
    body = request.get_json()
    h_id = body.get('hijoId') or body.get('hijo_id')
    
    nuevo_auth = Autorizado(
        nombre=body['nombre'], apellidos=body['apellidos'], dni=body['dni'],
        telefono=body['telefono'], parentesco=body.get('parentesco'),
        foto_url=body.get('fotoUrl'), es_permanente=body.get('esPermanente', True),
        valido_desde=body.get('validoDesde'), valido_hasta=body.get('validoHasta'),
        hijo_id=h_id
    )
    db.session.add(nuevo_auth)
    try:
        db.session.commit()
        return jsonify({"msg": "Autorizado registrado", "autorizado": nuevo_auth.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error", "error": str(e)}), 500

@api.route('/autorizados/<int:auth_id>', methods=['DELETE'])
def delete_autorizado(auth_id):
    """Ruta para eliminar un autorizado específico de la base de datos"""
    auth = Autorizado.query.get(auth_id)
    if not auth:
        return jsonify({"msg": "Autorizado no encontrado"}), 404
    
    try:
        db.session.delete(auth)
        db.session.commit()
        return jsonify({"msg": "Autorizado eliminado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al eliminar", "error": str(e)}), 500

# Rutas de user

@api.route('/parent-data/<int:user_id>', methods=['GET'])
def get_parent_data(user_id):    
    user = User.query.get(user_id)
    if not user: return jsonify({"msg": "Usuario no encontrado"}), 404
        
    hijos = Hijo.query.filter_by(user_id=user_id).all()
    # Consulta join para traer solo los autorizados vinculados a los hijos de este usuario
    autorizados = db.session.query(Autorizado).join(Hijo).filter(Hijo.user_id == user_id).all()

    return jsonify({
        "hijos": [h.serialize() for h in hijos],
        "autorizados": [a.serialize() for a in autorizados]
    }), 200