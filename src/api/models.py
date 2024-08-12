
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
 

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username
        }

class Recommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    game_id = db.Column(db.Integer, nullable=False)
    
    user = db.relationship('User', backref='recommended_games')

    def __repr__(self):
        return f'<Recommendation {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "game_id": self.game_id
        }

class TokenBlockedList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(255), nullable=False, unique=True)

    def __repr__(self):
        return f'<TokenBlockedList {self.jti}>'
