from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Hijo, Autorizado, Rutina, Actividad
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    if not body or "email" not in body or "password" not in body:
        return jsonify({"msg": "Faltan credenciales"}), 400

    user = User.query.filter_by(email=body['email'], password=body['password']).first()
    
    if user is None: 
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401
    
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        "msg": "Login exitoso",
        "token": access_token,
        "user": user.serialize()
    }), 200


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

@api.route('/rutinas', methods=['GET', 'POST'])
@jwt_required()
def handle_rutinas():
    current_user_id = get_jwt_identity()

    try:
        if request.method == 'GET':
            rutinas = Rutina.query.filter_by(user_id=current_user_id).all()
            return jsonify([r.serialize() for r in rutinas]), 200

        if request.method == 'POST':
            body = request.get_json()
            if not body or not body.get("nombre"):
                return jsonify({"msg": "El nombre es obligatorio"}), 400
                
            nueva_rutina = Rutina(
                nombre=body.get("nombre"),
                detalles=body.get("detalles", ""),
                user_id=current_user_id
            )
            db.session.add(nueva_rutina)
            db.session.commit()
            return jsonify(nueva_rutina.serialize()), 201
            
    except Exception as e:
        db.session.rollback()
        print(f"Error en /rutinas: {str(e)}")
        return jsonify({"msg": "Error interno del servidor", "error": str(e)}), 500

@api.route('/rutinas/<int:rutina_id>', methods=['DELETE'])
@jwt_required()
def delete_rutina(rutina_id):
    current_user_id = get_jwt_identity()
    rutina = Rutina.query.filter_by(id=rutina_id, user_id=current_user_id).first()
    
    if not rutina:
        return jsonify({"msg": "Rutina no encontrada o no autorizada"}), 404

    db.session.delete(rutina)
    db.session.commit()
    return jsonify({"msg": "Rutina eliminada"}), 200

@api.route('/rutinas/<int:rutina_id>/actividades', methods=['GET', 'POST'])
@jwt_required()
def handle_actividades(rutina_id):
    current_user_id = get_jwt_identity()
    rutina = Rutina.query.filter_by(id=rutina_id, user_id=current_user_id).first()
    
    if not rutina:
        return jsonify({"msg": "Rutina no encontrada o no tienes permiso"}), 404

    if request.method == 'GET':
        actividades = Actividad.query.filter_by(rutina_id=rutina_id).all()
        return jsonify([a.serialize() for a in actividades]), 200

    if request.method == 'POST':
        try:
            body = request.get_json()
            nueva_actividad = Actividad(
                text=body.get("text"),
                time=body.get("time"),
                category=body.get("category"),
                rutina_id=rutina_id
            )
            db.session.add(nueva_actividad)
            db.session.commit()
            return jsonify(nueva_actividad.serialize()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"msg": "Error al crear actividad", "error": str(e)}), 500

@api.route('/actividades/<int:actividad_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def update_delete_actividad(actividad_id):
    actividad = Actividad.query.get(actividad_id)
    if not actividad:
        return jsonify({"msg": "Actividad no encontrada"}), 404

    if request.method == 'PUT':
        body = request.get_json()
        actividad.text = body.get("text", actividad.text)
        actividad.time = body.get("time", actividad.time)
        actividad.category = body.get("category", actividad.category)
        db.session.commit()
        return jsonify(actividad.serialize()), 200

    if request.method == 'DELETE':
        db.session.delete(actividad)
        db.session.commit()
        return jsonify({"msg": "Actividad eliminada"}), 200