from datetime import datetime

from config import app, db
from flask import jsonify, request
from models import ServiceProvider, User


@app.route("/get_service_provider", methods=["GET"])
def get_service_provider():
    service_providers = ServiceProvider.query.all()
    json_service_providers = list(map(lambda x: x.to_json(), service_providers))

    return jsonify({"service_providers": json_service_providers})


# TO DO: UPDATE JS TO MATCH SERVICE PROVIDER ATTRIBUTES
@app.route("/create_service_provider", methods=["POST"])
def create_service_provider():
    name = request.json.get("name")
    service_provided = request.json.get("service_provided")
    address = request.json.get("address")
    phone_number = request.json.get("phone_number")
    email = request.json.get("email")
    date_of_birth = request.json.get("date_of_birth")
    rate = request.json.get("rate")
    gender = request.json.get("gender")

    if not name:
        return (jsonify({"message": "You must include your name"}), 400)
    if not service_provided:
        return (jsonify({"message": "You must include service type"}), 400)
    if not address:
        return (jsonify({"message": "You must include address"}), 400)
    if not phone_number:
        return (jsonify({"message": "You must include phone number"}), 400)
    if not email:
        return (jsonify({"message": "You must include email address"}), 400)
    if not rate:
        return (jsonify({"message": "You must include rate"}), 400)
    if not gender:
        return (jsonify({"message": "You must include your gender"}), 400)
    if not date_of_birth:
        return (jsonify({"message": "You must include your date of birth"}), 400)

    new_service_provider = ServiceProvider(
        name=name,
        service_provided=service_provided,
        address=address,
        phone_number=phone_number,
        email=email,
        date_of_birth=datetime.fromisoformat(date_of_birth),
        rate=rate,
        gender=gender,
    )

    try:
        db.session.add(new_service_provider)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Service provider created!"}), 201


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
