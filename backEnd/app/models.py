from datetime import datetime

from config import db
from sqlalchemy import DateTime
from sqlalchemy.dialects.postgresql import ENUM

GENDER_ENUM = ENUM(
    'male',
    'female',
    name='gender_type'
)

SERVICE_TYPE_ENUM = ENUM(
    'peon',
    'maid',
    'driver',
    name='service_type'
)


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
    typeOfService = db.Column(SERVICE_TYPE_ENUM, unique=False, nullable=False)
    gender = db.Column(GENDER_ENUM, unique=False, nullable=False)
    numberOfReviewsReceived = db.Column(db.Integer, default=0)
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
            "dateOfBirth": self.dateOfBirth.isoformat() if self.dateOfBirth else None,
            "phoneNumber": self.phoneNumber,
            "profilePicture": self.profilePicture,
            "typeOfService": self.typeOfService,
            "gender": self.gender,
            "numberOfReviewsReceived": self.numberOfReviewsReceived,
            "distance": self.distance,
            "rating": self.rating
        }

class JobSeeker(db.Model): 
    id = db.Column(db.Integer, primary_key=True)

    firstName = db.Column(db.String(80), unique=False, nullable=False)
    middleName = db.Column(db.String(80), unique=False, nullable=True)
    lastName = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=True)
    houseAddress = db.Column(db.String(225), unique=False, nullable=False)
    dateOfBirth = db.Column(DateTime, unique=False, nullable=False)
    phoneNumber = db.Column(db.String(15), unique=False, nullable=False)
    profilePicture = db.Column(db.String(225), unique=False, nullable=True)
    gender = db.Column(GENDER_ENUM, unique=False, nullable=False)
    numberOfReviewsGiven = db.Column(db.Integer, default=0)
    createdAt = db.Column(DateTime, default=datetime.utcnow)
    updatedAt = db.Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_json(self):
        return {
            "id" : self.id,
            "firstName": self.firstName,
            "middleName": self.middleName,
            "lastName": self.lastName,
            "email": self.email,
            "houseAddress": self.houseAddress,
            "dateOfBirth": self.dateOfBirth.isoformat() if self.dateOfBirth else None,
            "phoneNumber": self.phoneNumber,
            "profilePicture": self.profilePicture,
            "gender": self.gender,
            "numberOfReviewsGiven": self.numberOfReviewsGiven,
            "createdAt": self.createdAt.isoformat() if self.createdAt else None,
            "updatedAt": self.updatedAt.isoformat() if self.createdAt else None,
        }
