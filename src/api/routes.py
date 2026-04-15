from flask import Flask, request, jsonify, Blueprint
from api.models import db, User

api = Blueprint('api', __name__)

@api.route('/registro', methods=['POST'])
def handle_registro():
    body = request.get_json()

    if body is None:
        return jsonify({"msg": "No se recibió información"}), 400
    
    nuevo_usuario = User(
        email=body['email'],
        password=body['password'],
        nombre=body['nombre'],
        apellidos=body['apellidos'],
        edad=body['edad'],
        direccion_hogar=body.get('direccionHogar'),
        direccion_trabajo=body.get('direccionTrabajo'),
        telefono=body.get('telefonoCompleto'),
        foto_perfil=body.get('fotoPerfil'),
        is_active=True
    )

    db.session.add(nuevo_usuario)
    
    try:
        db.session.commit()
        return jsonify({"msg": "Usuario creado con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error al guardar en la base de datos", "error": str(e)}), 500

@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    
    if body is None or "email" not in body or "password" not in body:
        return jsonify({"msg": "Debes proporcionar email y contraseña"}), 400

    email = body['email']
    password = body['password']

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    return jsonify({
        "msg": "Login exitoso",
        "user": user.serialize()
    }), 200