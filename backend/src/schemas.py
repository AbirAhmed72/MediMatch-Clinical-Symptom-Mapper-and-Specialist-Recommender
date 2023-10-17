from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List

from sqlalchemy.sql.sqltypes import Integer, String


class UserData(BaseModel):
    id: int
    name: str
    email: str
    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

    
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    class Config:
        orm_mode = True


class ResponseUserData(UserData):
    token: str
    class Config:
        orm_mode = True

class Symptoms(BaseModel):
    perceived_symptoms: List[str]

    class Config:
        orm_mode = True
        
class ConsultationData(Symptoms):
    required_doctor: str
    predicted_disease: str
    appointment_datetime: datetime
    

class ConsultationResponse(BaseModel):
    appointment_id :int
    user_id :int
    patient_name: str
    required_doctor :str
    symptoms: str
    predicted_disease: str
    doctor_id: int
    status: bool
    appointment_datetime: datetime

    class Config:
        orm_mode = True

class DoctorData(BaseModel):
    id: int
    email: str
    name: str
    specialization: str
    approval: bool

    class Config:
        orm_mode = True


class DoctorWithPassword(BaseModel):
    email: str
    name: str
    specialization: str
    password: str

    class Config:
        orm_mode = True

class DeleteAppointmentRequest(BaseModel):
    id: int

    class Config:
        orm_mode = True


class AdminData(BaseModel):
    id: int
    email: str

    class Config:
        orm_mode = True

class AdminWithPassword(BaseModel):
    email: str
    password: str

    class Config:
        orm_mode = True



class ComplaintBase(BaseModel):
    complaint_text: str
    
    class Config:
        orm_mode = True

class ComplaintUpdate(BaseModel):
    complaint_text: str
    class Config:
        orm_mode = True

class Complaint(ComplaintBase):
    id: int
    user_email: str
    feedback_text: Optional[str]

    class Config:
        orm_mode = True


class Feedback(BaseModel):
    feedback_text: str

    class Config:
        orm_mode = True