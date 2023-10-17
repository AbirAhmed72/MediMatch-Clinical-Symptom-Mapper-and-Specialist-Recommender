import random
from datetime import datetime, time, timedelta
from typing import List, Optional

import joblib as jb
import models
import schemas
import services
from database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from schemas import Symptoms, TokenData
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import false
from sqlalchemy.sql.sqltypes import Integer

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


credentials_exception = HTTPException(
    status_code=401,
    detail="Could not Validate the credentials",
    headers={"WWW-Authenticate": "Bearer"}
)


def verify_user(token: str):

    try:
        payload = jwt.decode(token, services.SECRET_KEY,
                             algorithms=[services.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=email)
        return token_data
    except JWTError:
        raise credentials_exception


model = jb.load('../trained_model')


@app.post('/token', response_model=schemas.Token)
def login_for_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_dict = services.get_user_by_email(db, form_data.username)
    if not user_dict:
        user_dict = services.get_doctor_by_email(db, form_data.username)
    if not user_dict:
        user_dict = services.get_admin_by_email(db, form_data.username)
    if not user_dict:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # hashed_pwd = services.create_hashed_password(form_data.password)
    if not services.verify_hashed_password(form_data.password, user_dict.password_hashed):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=services.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.create_access_token(
        data={"sub": user_dict.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# input sample for tb
# perceived_symptoms = {["chest_pain","cough","fatigue","high_fever","loss_of_appetite","malaise","sweating","weight_loss","swelled_lymph_nodes"]}


@app.post("/check_disease/")
async def check_disease(symptoms: Symptoms):
    # print (f"{perceived_symptoms=}")

    # disease_list = [
    # 'Fungal infection','Allergy','GERD','Chronic cholestasis','Drug Reaction','Peptic ulcer diseae','AIDS','Diabetes ',
    # 'Gastroenteritis','Bronchial Asthma','Hypertension ','Migraine','Cervical spondylosis','Paralysis (brain hemorrhage)',
    # 'Jaundice','Malaria','Chicken pox','Dengue','Typhoid','hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D',
    # 'Hepatitis E', 'Alcoholic hepatitis','Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)',
    # 'Heart attack', 'Varicose veins','Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis', 'Arthritis',
    # '(vertigo) Paroymsal  Positional Vertigo','Acne', 'Urinary tract infection', 'Psoriasis', 'Impetigo'
    # ]
    symptoms_list = [
        'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain',
        'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination',
        'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy',
        'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating',
        'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes',
        'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine',
        'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
        'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation',
        'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs',
        'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool',
        'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs',
        'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails',
        'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips',
        'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints',
        'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness',
        'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine',
        'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
        'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain',
        'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum',
        'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
        'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
        'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf',
        'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
        'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
        'yellow_crust_ooze'
    ]
    Rheumatologist = ['Osteoarthristis', 'Arthritis']

    Cardiologist = ['Heart attack', 'Bronchial Asthma', 'Hypertension ']

    ENT_specialist = [
        '(vertigo) Paroymsal  Positional Vertigo', 'Hypothyroidism']

    Orthopedist = []

    Neurologist = ['Varicose veins',
                   'Paralysis (brain hemorrhage)', 'Migraine', 'Cervical spondylosis']

    Allergist_Immunologist = ['Allergy', 'Pneumonia', 'AIDS',
                              'Common Cold', 'Tuberculosis', 'Malaria', 'Dengue', 'Typhoid']

    Urologist = ['Urinary tract infection', 'Dimorphic hemmorhoids(piles)']

    Dermatologist = ['Acne', 'Chicken pox',
                     'Fungal infection', 'Psoriasis', 'Impetigo']

    Gastroenterologist = ['Peptic ulcer diseae', 'GERD', 'Chronic cholestasis', 'Drug Reaction', 'Gastroenteritis', 'Hepatitis E',
                          'Alcoholic hepatitis', 'Jaundice', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Diabetes ', 'Hypoglycemia']

    # init all array values to 0
    test_symptoms = [0]*len(symptoms_list)
    for i in range(len(symptoms_list)):
        for p_symptom in symptoms.perceived_symptoms:
            if p_symptom == symptoms_list[i]:
                test_symptoms[i] = 1
    input_test = [test_symptoms]
    disease = model.predict(input_test)[0]

    if disease in Rheumatologist:
        specialist = "Rheumatologist"

    if disease in Cardiologist:
        specialist = "Cardiologist"

    elif disease in ENT_specialist:
        specialist = "ENT specialist"

    elif disease in Orthopedist:
        specialist = "Orthopedist"

    elif disease in Neurologist:
        specialist = "Neurologist"

    elif disease in Allergist_Immunologist:
        specialist = "Allergist/Immunologist"

    elif disease in Urologist:
        specialist = "Urologist"

    elif disease in Dermatologist:
        specialist = "Dermatologist"

    elif disease in Gastroenterologist:
        specialist = "Gastroenterologist"

    else:
        specialist = "Other"

    result = schemas.ConsultationData(
        perceived_symptoms=symptoms.perceived_symptoms,
        predicted_disease=disease,
        required_doctor=specialist
    )
    return result


@app.get("/approved_doctors", response_model=List[schemas.DoctorData])
async def approved_doctors(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    # Retrieve the list of approved doctors from the database
    approved_doctors = services.get_approved_doctors(
        db, skip=skip, limit=limit)

    # Return the list of approved doctors in the response
    return approved_doctors


@app.get("/specialized_doctors/{doctor_specialization}", response_model=List[schemas.DoctorData])
async def specialized_doctors(doctor_specialization: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    # Retrieve the list of specialized doctors from the database
    specialized_doctors = services.get_specialized_doctors_list(
        db, doctor_specialization, skip=skip, limit=limit)

    if not specialized_doctors:
        raise HTTPException(
            status_code=404, detail="No doctors found for the given specialization")

    # Return the list of specialized doctors in the response
    return specialized_doctors


@app.post('/patient_signup')
async def patient_signup(user_data: schemas.UserCreate,  db: Session = Depends(get_db)):
    db_user = services.get_user_by_email(db, user_data.email)
    
    if db_user:
        raise HTTPException(
            status_code=400, detail="E-mail already Registered")
    access_token_expires = timedelta(
        minutes=services.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.create_access_token(
        data={"sub": user_data.email}, expires_delta=access_token_expires
    )
    
    data = services.create_user(db, user_data)
    data.token = access_token
    return data


@app.post('/doctor_signup')
async def doctor_signup(doctor_data: schemas.DoctorWithPassword, db: Session = Depends(get_db)):
    db_user = services.get_doctor_by_email(db, doctor_data.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    response = services.add_doctor(db, doctor_data)
    delattr(response, "password_hashed")
    return {
        "status": "Doctor signup successful. Waiting for admin approval.",
        "info": response
    }

# @app.post("/admin_signup", response_model=schemas.AdminData)
# async def admin_signup(admin_data: schemas.AdminWithPassword, db: Session = Depends(get_db)):
#     # Check if the admin email is already registered
#     if services.get_admin_by_email(db, admin_data.email):
#         raise HTTPException(status_code=400, detail="Email already registered")

#     # Create a new admin user
#     hashed_password = services.create_hashed_password(admin_data.password)
#     admin = models.Admins(
#         email=admin_data.email,
#         password_hashed=hashed_password
#     )
#     db.add(admin)
#     db.commit()
#     db.refresh(admin)

#     # Return the created admin user data
#     return admin


@app.get('/me')
async def get_current_user_info(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    if services.is_doctor(db, token_data.username):
        user = services.get_doctor_by_email(db, token_data.username)
        delattr(user, "password_hashed")
        return {
            "my_info": user,
            "role": "doctor"
        }

    if services.get_admin_by_email(db, token_data.username):
        return {
            "my_info": token_data.username,
            "role": "admin"
        }

    user = services.get_user_by_email(db, token_data.username)
    appointment = services.has_appointment(db, user.id)
    delattr(user, "password_hashed")
    if appointment is not None:
        appointment.doctor_name = services.get_doctor_by_id(
            db, appointment.doctor_id).name
    return {
        "my_info": services.get_user_by_email(db, token_data.username),
        "appointment": appointment,
        "role": "user"
    }


@app.post('/patient/appointment/add', tags=["Patient"])
async def make_appointment(data: schemas.ConsultationData, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    if data.appointment_datetime is None:
        raise HTTPException(
            status_code=400, detail="Appointment datetime is required.")

    if data.required_doctor is None:
        raise HTTPException(
            status_code=400, detail="Required doctor specialization is required.")

    user = services.get_user_by_email(db, email=token_data.username)
    if user is None:
        raise credentials_exception

    if services.has_appointment(db, user.id):
        raise HTTPException(
            status_code=400, detail="User already has an appointment")

    doctors = services.get_specialized_doctors_list(db, data.required_doctor)
    approved_doctors = [doctor for doctor in doctors if doctor.approval]

    if not approved_doctors:
        raise HTTPException(
            status_code=500, detail="No approved doctors available")

    doctor = random.choice(approved_doctors)
    doctor_id = doctor.id

    appointment = services.make_appointment(db, user.id, doctor_id, data)
    return {
        "appointment": appointment,
        "doctor": services.get_doctor_by_id(db, appointment.doctor_id).name
    }


@app.get('/patient/appointment/show', tags=["Patient"])
async def show_my_appointment(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):

    token_data = verify_user(token)

    user = services.get_user_by_email(db, email=token_data.username)
    if user is None:
        raise credentials_exception

    appointment = services.get_appointment_by_user_id(db, user.id)
    if appointment is None:
        return {"message": "You got no appointments"}

    return appointment


@app.delete('/patient/appointment/delete', tags=["Patient"])
async def delete_appointment(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    user = services.get_user_by_email(db, email=token_data.username)
    if user is None:
        raise credentials_exception

    appointment = services.get_appointment_by_user_id(db, user.id)
    if appointment is None:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    # Check if the authenticated user is the owner of the appointment
    if appointment.user_id != user.id:
        raise HTTPException(
            status_code=403,
            detail="You do not have permission to delete this appointment"
        )

    status = services.delete_appointment(db, appointment.appointment_id)
    if status:
        return {
            "status": "Appointment deleted successfully!"
        }

    raise HTTPException(
        status_code=500,
        detail="Failed to delete the appointment"
    )


@app.get('/doctor/show_patients', response_model=List[schemas.ConsultationResponse], tags=["Doctor"])
async def show_appointments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):

    token_data = verify_user(token)

    doctor = services.get_doctor_by_email(db, email=token_data.username)
    if doctor is None:
        raise credentials_exception

    patients = services.get_patients_for_doctor(
        db, doctor.id, skip=skip, limit=limit)
    patients_who_made_appointment = [
        patient for patient in patients if patient is not None]

    return patients_who_made_appointment


@app.put('/doctor/{appointment_id}/status', tags=["Doctor"])
async def change_appointment_status(appointment_id: int, status: bool, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    doctor = services.get_doctor_by_email(db, email=token_data.username)
    if doctor is None:
        raise credentials_exception

    appointment = services.get_appointment(db, appointment_id)
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")

    if appointment.doctor_id != doctor.id:
        raise HTTPException(
            status_code=403, detail="You are not authorized to change the status of this appointment")

    appointment.status = status
    db.commit()
    db.refresh(appointment)

    return {"message": f"Appointment status updated to {status} successfully",
            "appointment": appointment}


@app.put("/admin/approve_doctor/{doctor_email}", tags=["Admin"])
async def approve_doctor(doctor_email: str, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    # Get the doctor from the database
    doctor = services.get_doctor_by_email(db, doctor_email)

    # Check if the doctor exists
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    if doctor.is_approved == True:
        raise HTTPException(
            status_code=400, detail="Doctor is already approved")

    # Update the doctor's approval status
    doctor.is_approved = True
    db.commit()

    # Return the updated doctor data
    return {"message": "Doctor approved successfully"}


@app.get('/admin/patients', tags=["Admin"])
def get_all_patients(skip: int = 0, limit: int = 100, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)
    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    patients = db.query(models.UserBase).offset(skip).limit(limit).all()
    return {"patients": patients}


@app.delete('/admin/patients/{patient_id}', tags=["Admin"])
def delete_patient(patient_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    patient = db.query(models.UserBase).filter(
        models.UserBase.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    db.delete(patient)
    db.commit()

    return {"message": f"Patient {patient.id} deleted successfully"}


@app.get('/admin/doctors', tags=["Admin"])
def get_all_doctors(skip: int = 0, limit: int = 100, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)
    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    doctors = db.query(models.Doctors).offset(skip).limit(limit).all()
    return {"doctors": doctors}


@app.delete('/admin/doctors/{doctor_id}', tags=["Admin"])
def delete_doctor(doctor_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    doctor = db.query(models.Doctors).filter(
        models.Doctors.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    db.delete(doctor)
    db.commit()

    return {f"message": "Doctor {doctor.id} deleted successfully"}


@app.get('/admin/complaints', tags=["Admin"])
def get_all_complaints(skip: int = 0, limit: int = 100, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)
    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    complaints = db.query(models.Complaints).offset(skip).limit(limit).all()
    return {"complaints": complaints}


@app.delete('/admin/complaints/{complaint_id}', tags=["Admin"])
def delete_complaint(complaint_id: int, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    complaint = db.query(models.Complaints).filter(
        models.Complaints.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    db.delete(complaint)
    db.commit()

    return {"message": f"Complaint {complaint.id} deleted successfully"}


# Endpoint for admin to provide feedback on a complaint
@app.put('/admin/complaints/{complaint_id}/feedback', tags=["Admin"])
def provide_feedback(complaint_id: int, feedback: schemas.Feedback, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    admin = services.get_admin_by_email(db, token_data.username)
    if not admin:
        raise credentials_exception

    # Retrieve the complaint by ID
    complaint = db.query(models.Complaints).filter(
        models.Complaints.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    # Update the complaint with the provided feedback
    complaint.feedback_text = feedback.feedback_text
    db.commit()

    return {"message": "Feedback provided successfully"}


# Endpoint for submitting a complaint
@app.post('/user/complaints', tags=["Users"])
def submit_complaint(complaint: schemas.ComplaintBase, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Create a new complaint entry in the database

    token_data = verify_user(token)

    # Check if the user already has a complaint
    existing_complaint = db.query(models.Complaints).filter(
        models.Complaints.user_email == token_data.username).first()
    if existing_complaint:
        raise HTTPException(
            status_code=400, detail=f"You already have a complaint of id {existing_complaint.id}")

    new_complaint = models.Complaints(
        user_email=token_data.username,
        complaint_text=complaint.complaint_text,
        feedback_text=None  # Initialize feedback as None
    )
    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)
    return {"message": "Complaint submitted successfully", "complaint_id": new_complaint.id}


# Endpoint to retrieve a specific complaint by the user
@app.get('/user/complaints', tags=["Users"])
def get_complaint(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    # Retrieve the complaint by user email
    complaint = db.query(models.Complaints).filter(
        models.Complaints.user_email == token_data.username).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    return {"complaint": complaint}


@app.put('/user/complaints', tags=["Users"])
def update_complaint(complaint_update: schemas.ComplaintUpdate, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    # Retrieve the complaint by user email
    complaint = db.query(models.Complaints).filter(
        models.Complaints.user_email == token_data.username).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    if complaint.feedback_text:
        raise HTTPException(
            status_code=400, detail=f"You already have a feedback for this complaint which is: {complaint.feedback_text}")

    # Update the complaint text
    complaint.complaint_text = complaint_update.complaint_text
    db.commit()

    return {"message": "Complaint updated successfully"}

# Endpoint for user to delete their own complaint


@app.delete('/user/complaints', tags=["Users"])
def delete_complaint(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):

    token_data = verify_user(token)

    # Retrieve the complaint by user email
    complaint = db.query(models.Complaints).filter(
        models.Complaints.user_email == token_data.username).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    # Delete the complaint
    db.delete(complaint)
    db.commit()

    return {"message": "Complaint deleted successfully"}
