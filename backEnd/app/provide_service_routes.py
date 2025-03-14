import json
from datetime import datetime

import requests
from config import app, db
from flask import Blueprint, jsonify, request
from models import JobSeeker, ServiceProvider
from werkzeug.security import check_password_hash, generate_password_hash

provide_service_bp = Blueprint('provide_service_bp', __name__)

GOOGLE_API_KEY = "AIzaSyDyezdJfN8YVgq52EaCOWVTNQg8cTYZM44"

@provide_service_bp.route('/provide_service_bp')
def provide_service_home():
    return "Provide Service Home"

@app.route("/get_service_provider", methods=["GET"])
def get_service_provider():
    service_providers = ServiceProvider.query.all()
    json_service_providers = list(map(lambda x: x.to_json(), service_providers))

    return jsonify({"service_providers": json_service_providers})

@app.route("/delete_all_sp", methods=["DELETE"])
def delete_all_sp():
    service_providers = ServiceProvider.query.all()
    for service_provider in service_providers:
        delete_service_provider(service_provider.id)

    return jsonify({"message": "All service providers deleted"}), 200


@app.route("/create_service_provider", methods=["POST"])
def create_service_provider():
    name = request.json.get("name")
    account_type = "service_provider"
    service_type = request.json.get("service_type")
    address = request.json.get("address")
    phone_number = request.json.get("phone_number")
    email = request.json.get("email")
    password = request.json.get("password")
    date_of_birth = request.json.get("date_of_birth")
    rate = request.json.get("rate")
    gender = request.json.get("gender")
    profile_picture = request.json.get("profile_picture")

    if not name:
        return (jsonify({"message": "You must include your name"}), 400)
    if not service_type:
        return (jsonify({"message": "You must include service type"}), 400)
    if not address:
        return (jsonify({"message": "You must include address"}), 400)
    if not phone_number:
        return (jsonify({"message": "You must include phone number"}), 400)
    if not email:
        return (jsonify({"message": "You must include email address"}), 400)
    # if not rate:
    #     return (jsonify({"message": "You must include rate"}), 400)
    if not gender:
        return (jsonify({"message": "You must include your gender"}), 400)
    if not date_of_birth:
        return (jsonify({"message": "You must include your date of birth"}), 400)

    new_service_provider = ServiceProvider(
        name=name,
        account_type=account_type,
        service_type=service_type,
        address=address,
        phone_number=phone_number,
        email=email,
        password=generate_password_hash(password),
        date_of_birth=datetime.fromisoformat(date_of_birth),
        rate=rate,
        gender=gender,
        profile_picture=profile_picture
    )

    try:
        db.session.add(new_service_provider)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Service provider created!"}), 201


@app.route("/delete_service_provider/<int:user_id>", methods=["DELETE"])
def delete_service_provider(user_id):
    # get service provider by their id
    service_provider = ServiceProvider.query.get(user_id)

    if not service_provider:
        return jsonify({"message": "Service provider not found"}), 404

    db.session.delete(service_provider)
    db.session.commit()


    return jsonify({"message": "Service provider deleted"}), 200

@app.route("/getDistance/<string:jobSeekerAddress>/<string:serviceProviderAddress>", methods=["GET"])
def getDistance(jobSeekerAddress, serviceProviderAddress):
    # jobSeeker = JobSeeker.query.get(jobSeekerEmail)
    # serviceProvider = ServiceProvider.query.get(serviceProviderEmail)
    #
    # if not jobSeeker:
    #     return jsonify({"error": f"JobSeeker with ID {jobSeekerEmail} not found"}), 404
    # if not serviceProvider:
    #     return jsonify({"error": f"ServiceProvider with ID {serviceProviderEmail} not found"}), 404
    #
    # jobSeekerLocation = jobSeeker.address
    # serviceProviderLocation = serviceProvider.address

    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={jobSeekerAddress}&destinations={serviceProviderAddress}&key={GOOGLE_API_KEY}" 

    try:
        response = requests.get(url)
        data = response.json()

        if data["status"] == "OK":
            distance = data["rows"][0]["elements"][0]["distance"]["text"]
            # print(json.dumps(data, indent=2))
            return jsonify({"distance": distance})
    except Exception as e:
        print(json.dumps(data, indent=2))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
