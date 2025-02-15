from flask import jsonify, request
from werkzeug.security import check_password_hash

from config import app, db
from models import ServiceProvider, User


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    original_password = data.get("original_password")

    if not email:
        return (jsonify({"message": "You must include your email"}))
    if not original_password:
        return (jsonify({"message": "You must include your password"}))

    user = User.query.filter_by(email=email).first()
    if not user:
        return (jsonify({"message": "User not found"}))

    if not user.check_password_hash(user.password, original_password):
        return (jsonify({"message": "Incorrect password"}))

    return jsonify({"message": "Successfully found email and password"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
