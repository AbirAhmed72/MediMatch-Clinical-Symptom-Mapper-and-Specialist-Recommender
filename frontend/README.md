# API Endpoints for Parsing symptom using NLP and predicting disease from those symptoms.

## POST /token:

Authenticate and retrieve an access token.

## POST /check_disease:

Check a disease based on perceived symptoms.

## GET /approved_doctors:

Retrieve a list of approved doctors.

## GET /specialized_doctors/{doctor_specialization}:

Get doctors by specialization.

## POST /patient_signup:

Sign up a patient user.

## POST /doctor_signup:

Sign up a doctor user and wait for admin approval.

## GET /me:

Retrieve user or doctor information.

## POST /patient/appointment/add:

Schedule an appointment with a doctor.

## GET /patient/appointment/show:

View your scheduled appointments.

## DELETE /patient/appointment/delete:

Cancel your appointment.

## GET /doctor/show_patients:

View patients who have appointments with you.

## PUT /doctor/{appointment_id}/status:

Change appointment status as a doctor.

## PUT /admin/approve_doctor/{doctor_email}:

Approve a doctor as an admin.

## GET /admin/patients:

Retrieve a list of all patients as an admin.

## DELETE /admin/patients/{patient_id}:

Delete a patient as an admin.

## GET /admin/doctors:

Retrieve a list of all doctors as an admin.

## DELETE /admin/doctors/{doctor_id}:

Delete a doctor as an admin.

## GET /admin/complaints:

Retrieve a list of user complaints as an admin.

## DELETE /admin/complaints/{complaint_id}:

Delete a user's complaint as an admin.

## PUT /admin/complaints/{complaint_id}/feedback:

Provide feedback on a user's complaint as an admin.

## POST /user/complaints:

Submit a complaint as a user.

## GET /user/complaints:

Retrieve a specific user's complaint.

## PUT /user/complaints:

Update a user's complaint.

## DELETE /user/complaints:

Delete a user's complaint.
