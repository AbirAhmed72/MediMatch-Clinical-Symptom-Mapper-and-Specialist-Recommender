from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy.sql.sqltypes import Integer
import models, schemas
from jose import JWTError, jwt #JSON Web Token
from datetime import datetime, time, timedelta
import random
from passlib.hash import bcrypt


SECRET_KEY = 'e2c6a3bc1aad22372e102e8f9f657bccd65676aef94587815b9d4d2c4960a650'
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_hashed_password(password: str):
    return bcrypt.hash(password)

def verify_hashed_password(password: str, password_hashed: str):
    return bcrypt.verify(password, password_hashed)

def get_user_by_email(db: Session, email: str):
    print("Checking existing users")
    return db.query(models.UserBase).filter(models.UserBase.email == email).first()



def get_user_by_id(db: Session, id: int):
    print("Checking existing users")
    return db.query(models.UserBase).filter(models.UserBase.id == id).first()



def is_doctor(db: Session, email: str):
    if get_doctor_by_email(db, email) is None:
        return False
    return True


def has_appointment(db: Session, id: int):
    return db.query(models.Consultation).filter(models.Consultation.user_id == id).first()


def get_doctor_by_specialization(db: Session, required_doctor: str):
    print(required_doctor)
    if required_doctor == "Other":
        required_doctor = "Physician"
    doc = db.query(models.Doctors).filter(models.Doctors.specialization == required_doctor).all()
    if not doc:
        return None
    length = len(doc)
    index = random.randint(1,length)  # selecting random
    return doc[index-1]

def get_specialized_doctors_list(db: Session, doctor_specialization: str, skip: int = 0, limit: int = 10) -> List[schemas.DoctorData]:
    doctors = db.query(models.Doctors).filter(models.Doctors.specialization == doctor_specialization, models.Doctors.is_approved == True).offset(skip).limit(limit).all()
    specialized_doctors = []
    for doctor in doctors:
        specialized_doctors.append(
            schemas.DoctorData(
                id=doctor.id,
                email=doctor.email,
                name=doctor.name,
                specialization=doctor.specialization,
                approval=doctor.is_approved
            )
        )
    return specialized_doctors


def get_doctor_by_email(db: Session, email: str):
    return db.query(models.Doctors).filter(models.Doctors.email == email).first()



def get_doctor_by_id(db: Session, id: int):
    return db.query(models.Doctors).filter(models.Doctors.id == id).first()



def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = create_hashed_password(user.password)
    db_user = models.UserBase(
        # username = user.username,
        name = user.name,
        email = user.email,
        password_hashed = hashed_password,
        # is_active = True
    )
    print(db_user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    delattr(db_user, "password_hashed")
    return db_user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def make_appointment(db:Session, current_user_id:int, doctor_id: int, data: schemas.ConsultationData):

    appointment = models.Consultation(
        user_id = current_user_id,
        patient_name = get_user_by_id(db, current_user_id).name,
        doctor_id = doctor_id,
        required_doctor = data.required_doctor,
        symptoms = str(data.perceived_symptoms),
        predicted_disease = data.predicted_disease,
        status = False,
        appointment_datetime=data.appointment_datetime
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    # print(db.query(models.Consultation).filter(models.Consultation.user_id == current_user_id).first())
    return db.query(models.Consultation).filter(models.Consultation.user_id == current_user_id).first()

def get_patients_for_doctor(db: Session, id: int, skip: int = 0, limit: int = 100):
    # doc_info = db.query(models.Doctors).filter(models.Doctors.id == id)
    print(f"{id=}")
    patients = db.query(models.Consultation).filter(models.Consultation.doctor_id == id).offset(skip).limit(limit).all()
    return patients


def get_admin_by_email(db:Session, email :str):
    return db.query(models.Admins).filter(models.Admins.email == email).first()

def add_doctor(db: Session, data: schemas.DoctorWithPassword):
    hashed_password = create_hashed_password(data.password)
    doctor_data = models.Doctors(
        name=data.name,
        email=data.email,
        password_hashed=hashed_password,
        specialization=data.specialization,
        is_approved=False
    )
    db.add(doctor_data)
    db.commit()
    return doctor_data


def delete_appointment(db: Session, id: int):
    deleted = db.query(models.Consultation).filter(models.Consultation.appointment_id == id).delete()
    db.commit()
    if deleted:
        return True
    return False

def get_appointment(db: Session, appointment_id: int):
    return db.query(models.Consultation).filter(models.Consultation.appointment_id == appointment_id).first()

def get_appointment_by_user_id(db: Session, user_id: int):
    return db.query(models.Consultation).filter(models.Consultation.user_id == user_id).first()


def get_approved_doctors(db: Session, skip: int = 0, limit: int = 10) -> List[schemas.DoctorData]:
    doctors = db.query(models.Doctors).filter(models.Doctors.is_approved == True).offset(skip).limit(limit).all()
    approved_doctors = []
    for doctor in doctors:
        approved_doctors.append(
            schemas.DoctorData(
                id=doctor.id,
                email=doctor.email,
                name=doctor.name,
                specialization=doctor.specialization,
                approval=doctor.is_approved
            )
        )
    return approved_doctors



