CREATE TABLE "Role" (
  "roleId" bigint generated always as identity,
  "name" varchar NOT NULL
);

ALTER TABLE "Role" ADD CONSTRAINT "pkRole" PRIMARY KEY ("roleId");
CREATE UNIQUE INDEX "akRoleName" ON "Role" ("name");
CREATE TABLE "Account" (
  "accountId" bigint generated always as identity,
  "login" varchar(64) NOT NULL,
  "password" varchar NOT NULL
);

ALTER TABLE "Account" ADD CONSTRAINT "pkAccount" PRIMARY KEY ("accountId");
CREATE UNIQUE INDEX "akAccountLogin" ON "Account" ("login");

CREATE TABLE "AccountRole" (
  "accountId" bigint NOT NULL,
  "roleId" bigint NOT NULL
);

ALTER TABLE "AccountRole" ADD CONSTRAINT "pkAccountRole" PRIMARY KEY ("accountId", "roleId");
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
ALTER TABLE "AccountRole" ADD CONSTRAINT "fkAccountRoleRole" FOREIGN KEY ("roleId") REFERENCES "Role" ("roleId") ON DELETE CASCADE;
CREATE TABLE "Area" (
  "areaId" bigint generated always as identity,
  "name" varchar NOT NULL,
  "ownerId" bigint NOT NULL
);

ALTER TABLE "Area" ADD CONSTRAINT "pkArea" PRIMARY KEY ("areaId");
CREATE UNIQUE INDEX "akAreaName" ON "Area" ("name");
ALTER TABLE "Area" ADD CONSTRAINT "fkAreaOwner" FOREIGN KEY ("ownerId") REFERENCES "Account" ("accountId");

CREATE TABLE "AreaAccount" (
  "areaId" bigint NOT NULL,
  "accountId" bigint NOT NULL
);

ALTER TABLE "AreaAccount" ADD CONSTRAINT "pkAreaAccount" PRIMARY KEY ("areaId", "accountId");
ALTER TABLE "AreaAccount" ADD CONSTRAINT "fkAreaAccountArea" FOREIGN KEY ("areaId") REFERENCES "Area" ("areaId") ON DELETE CASCADE;
ALTER TABLE "AreaAccount" ADD CONSTRAINT "fkAreaAccountAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId") ON DELETE CASCADE;
CREATE TABLE "Message" (
  "messageId" bigint generated always as identity,
  "areaId" bigint NOT NULL,
  "fromId" bigint NOT NULL,
  "text" varchar NOT NULL
);

ALTER TABLE "Message" ADD CONSTRAINT "pkMessage" PRIMARY KEY ("messageId");
ALTER TABLE "Message" ADD CONSTRAINT "fkMessageArea" FOREIGN KEY ("areaId") REFERENCES "Area" ("areaId");
ALTER TABLE "Message" ADD CONSTRAINT "fkMessageFrom" FOREIGN KEY ("fromId") REFERENCES "Account" ("accountId");
CREATE TABLE "Session" (
  "sessionId" bigint generated always as identity,
  "accountId" bigint NOT NULL,
  "token" varchar NOT NULL,
  "ip" inet NOT NULL,
  "data" jsonb NOT NULL
);

ALTER TABLE "Session" ADD CONSTRAINT "pkSession" PRIMARY KEY ("sessionId");
ALTER TABLE "Session" ADD CONSTRAINT "fkSessionAccount" FOREIGN KEY ("accountId") REFERENCES "Account" ("accountId");
CREATE UNIQUE INDEX "akSessionToken" ON "Session" ("token");


CREATE TABLE "Patient" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL
);

CREATE TABLE "MedicalCard" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255),
  "patient_id" INTEGER NOT NULL
);

ALTER TABLE "MedicalCard" ADD CONSTRAINT "fk_medical_card.patient_id" FOREIGN KEY ("patient_id") REFERENCES "Patient" ("id");

CREATE TABLE "Specialization" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL
);

CREATE TABLE "Service" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "code" VARCHAR(255) NOT NULL,
  "specialization_id" INTEGER
);

ALTER TABLE "Service" ADD CONSTRAINT "fk_service.specialization_id" FOREIGN KEY ("specialization_id") REFERENCES "Specialization" ("id");

CREATE TABLE "Doctor" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR(255) NOT NULL,
  "last_name" VARCHAR(255) NOT NULL
);

CREATE TABLE "DoctorSpecialization" (
  "specialization_id" INTEGER,
  "doctor_id" INTEGER
);

ALTER TABLE "DoctorSpecialization" ADD CONSTRAINT "pk_doctor_specialization" PRIMARY KEY ("specialization_id", "doctor_id"); 
ALTER TABLE "DoctorSpecialization" ADD CONSTRAINT "fk_doctor_specialization.doctor_id" FOREIGN KEY ("doctor_id") REFERENCES "Doctor" ("id") ON DELETE CASCADE;
ALTER TABLE "DoctorSpecialization" ADD CONSTRAINT "fk_doctor_specialization.specialization_id" FOREIGN KEY ("specialization_id") REFERENCES "Specialization" ("id") ON DELETE CASCADE;


CREATE TABLE "Cabinet" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "number" VARCHAR(255) NOT NULL
);

CREATE TABLE "Appointment" (
  "id" SERIAL PRIMARY KEY,
  "patient_id" INTEGER NOT NULL,
  "doctor_id" INTEGER NOT NULL,
  "cabinet_id" INTEGER NOT NULL,
  "created" DATE NOT NULL DEFAULT CURRENT_DATE,
  "start_time" TIMESTAMP NOT NULL,
  "end_time" TIMESTAMP NOT NULL
);

CREATE TABLE "AppointmentService" (
  "id" SERIAL PRIMARY KEY,
  "appointment_id" INTEGER NOT NULL,
  "service_id" INTEGER NOT NULL
);

ALTER TABLE "AppointmentService" ADD CONSTRAINT "fk_appointment_service.appointment_id" FOREIGN KEY ("appointment_id") REFERENCES "Appointment" ("id") ON DELETE CASCADE;
ALTER TABLE "AppointmentService" ADD CONSTRAINT "fk_appointment_service.service_id" FOREIGN KEY ("service_id") REFERENCES "Service" ("id") ON DELETE CASCADE;

