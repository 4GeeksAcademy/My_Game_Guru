
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(120), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     password = db.Column(db.String(255), unique=False, nullable=False)
#     # is_active = db.Column(db.Boolean(), unique=False, nullable=False)
#     recommendations = db.relationship('Recommendation', backref='recommended_by', lazy=True)

#     def __repr__(self):
#         return f'<User {self.email}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "username": self.username
#             # do not serialize the password, its a security breach
#         }

# # class GameList(db.Model):
# #     id = db.Column(db.Integer, primary_key=True)
# #     game_id = db.Column(db.Integer, unique=False, nullable=False)
# #     game_name = db.Column(db.String(120), unique=False, nullable=False)  # Cambié db.Integer a db.String(120)

# #     def __repr__(self):
# #         return f'<GameList {self.game_name}>'

# #     def serialize(self):
# #         return {
# #             "id": self.id,
# #             "game_id": self.game_id,
# #             "game_name": self.game_name
# #         }

# class Recommendation(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     game_id = db.Column(db.Integer, db.ForeignKey('game_list.id'), nullable=False)

#     # Relación con User
#     user = db.relationship('User', backref=db.backref('recommended_games', lazy=True))

#     # Relación con GameList
#     # game = db.relationship('GameList', backref=db.backref('recommendations', lazy=True))

#     def __repr__(self):
#         return f'<Recommendation {self.id}>'

#     def serialize(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "game_id": self.game_id
#         }

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

    user = db.relationship('User', backref=db.backref('recommended_games', lazy=True))

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
