INSERT INTO "Account" ("login", "password") VALUES
  ('admin', 'ypMEd9FwvtlOjcvH94iICQ==:V6LnSOVwXzENxeLCJk59Toadea7oaA1IxYulAOtKkL9tBxjEPOw085vYalEdLDoe8xbrXQlhh7QRGzrSe8Bthw=='),
  ('marcus', 'dpHw0OUNBz76nuqrXZbeYQ==:wpvUVgi8Yp9rJ0yZyBWecaWP2EL/ahpxZY74KOVfhAYbAZSq6mWqjsQwtCvIPcSKZqUVpVb13JcSciB2fA+6Tg=='),
  ('user', 'r8zb8AdrlPSh5wNy6hqOxg==:HyO5rvOFLtwzU+OZ9qFi3ADXlVccDJWGSfUS8mVq43spJ6sxyliUdW3i53hOPdkFAtDn3EAQMttOlIoJap1lTQ=='),
  ('iskandar', 'aqX1O4bKXiwC/Jh2EKNIYw==:bpE4TARNg09vb2Libn1c00YRxcvoklB9zVSbD733LwQQFUuAm7WHP85PbZXwEbbeOVPIFHgflR4cvEmvYkr76g==');

-- Examples login/password
-- admin/123456
-- marcus/marcus
-- user/nopassword
-- iskandar/zulqarnayn

INSERT INTO "Area" ("name", "ownerId") VALUES
  ('Metarhia', 2),
  ('Metaeducation', 2);

INSERT INTO "AreaAccount" ("areaId", "accountId") VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4);

INSERT INTO "Patient" ("first_name", "last_name") VALUES ('Mark', 'Twen');

INSERT INTO "MedicalCard" ("title", "patient_id") VALUES('Medical card for Mark', 1);

INSERT INTO "Specialization" ("title") VALUES('Gastrologia');

INSERT INTO "Service" ("title", "code", "specialization_id") VALUES('Consultation of gastrolog', '1000', 1);

INSERT INTO "Doctor" ("first_name", "last_name") VALUES('Genadiy', 'Grygorenko');

INSERT INTO "DoctorSpecialization" ("specialization_id", "doctor_id") VALUES(1, 1);

INSERT INTO "Cabinet" ("title", "number") VALUES('Gastrolog', '100');

INSERT INTO "Appointment" ("patient_id" , "doctor_id" ,"cabinet_id" , "created" , "start_time" , "end_time") VALUES (1, 1, 1, CURRENT_DATE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 minutes');