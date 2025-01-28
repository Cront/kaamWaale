from config import db
from sqlalchemy import DateTime
from sqlalchemy.dialects.postgresql import ENUM


class ServiceProvider(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    firstName = db.Column(db.String(80), unique=False, nullable=False)
    middleName = db.Column(db.String(80), unique=False, nullable=True)
    lastName = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=True)
    houseAddress = db.Column(db.String(225), unique=False, nullable=False)
    dateOfBirth = db.Column(DateTime, unique=False, nullable=False)
    phoneNumber = db.Column(db.String(15), unique=False, nullable=False)
    profilePicture = db.Column(db.String(225), unique=False, nullable=True)
    typeOfService = db.Column(ENUM('peon', 'maid', 'driver', name='service_type'),unique=False, nullable=False)
    gender = db.Column(ENUM('male', 'female', name='gender_type'), unique=False, nullable=False)
    numberOfReviews = db.Column(db.Integer, default=0)
    distance = db.Column(db.Integer, default=0.0)
    rating = db.Column(db.Integer, default=0.0)

    def to_json(self):
        return {
            "id" : self.id,
            "firstName": self.firstName,
            "middleName": self.middleName,
            "lastName": self.lastName,
            "email": self.email,
            "houseAddress": self.houseAddress,
            "dateOfBirth": self.dateOfBirth.isoFormat() if self.dateOfBirth else None,
            "phoneNumber": self.phoneNumber,
            "profilePicture": self.profilePicture,
            "typeOfService": self.typeOfService,
            "gender": self.gender,
            "numberOfReviews": self.numberOfReviews,
            "distance": self.distance,
            "rating": self.rating
        }


