from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nombre = db.Column(db.String(80), nullable=False)
    apellidos = db.Column(db.String(80), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    direccion_hogar = db.Column(db.String(200))
    direccion_trabajo = db.Column(db.String(200))
    telefono = db.Column(db.String(20))
    foto_perfil = db.Column(db.String(255))
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    
    # Relacion para acceder a hijos
    hijos = db.relationship('Hijo', backref='parent', lazy=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "foto_perfil": self.foto_perfil,
            "hijos": [hijo.serialize() for hijo in self.hijos]
        }

class Hijo(db.Model):
    __tablename__ = 'hijo'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    apellido = db.Column(db.String(80), nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    foto_url = db.Column(db.String(255))
    info_adicional = db.Column(db.Text)
    
    # Datos Medicos
    intolerancia = db.Column(db.String(100), default="Ninguna")
    alergia = db.Column(db.String(100), default="Ninguna")
    asma = db.Column(db.String(50), default="No")
    tipo_sangre = db.Column(db.String(10), nullable=False)
    
    # Hitos desarrollo
    gatea = db.Column(db.String(10), default="No")
    autonomia_bano = db.Column(db.String(10), default="No")
    
    # forein key al padre
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Relacion de autorizados
    autorizados = db.relationship('Autorizado', backref='hijo_vinculado', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "edad": self.edad,
            "fotoUrl": self.foto_url,
            "datosMedicos": {
                "intolerancia": self.intolerancia,
                "alergia": self.alergia,
                "asma": self.asma,
                "tipoSangre": self.tipo_sangre
            },
            "desarrollo": {
                "gatea": self.gatea,
                "autonomiaBano": self.autonomia_bano
            },
            "info": self.info_adicional
        }

class Autorizado(db.Model):
    __tablename__ = 'autorizado'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    apellidos = db.Column(db.String(80), nullable=False)
    dni = db.Column(db.String(20), nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    parentesco = db.Column(db.String(50))
    foto_url = db.Column(db.String(255))
    es_permanente = db.Column(db.Boolean, default=True)
    valido_desde = db.Column(db.String(20))
    valido_hasta = db.Column(db.String(20))
    
    # Relacion con hijo a recoger
    hijo_id = db.Column(db.Integer, db.ForeignKey('hijo.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "dni": self.dni,
            "telefono": self.telefono,
            "parentesco": self.parentesco,
            "fotoUrl": self.foto_url,
            "esPermanente": self.es_permanente,
            "validoDesde": self.valido_desde,
            "validoHasta": self.valido_hasta,
            "hijoId": self.hijo_id
        }