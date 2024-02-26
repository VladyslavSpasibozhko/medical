type Account = { login?: string; password?: string; role?: Role };
type Appointment = {
  id?: number;
  patient: Patient;
  doctor: Doctor;
  cabinet: Cabinet;
  services: Service;
  created: number;
  start_time: number;
  end_time: number;
};
type Area = { name?: string; owner?: Account; members?: Account };
type Cabinet = { id?: number; number: number; title: string };
type Doctor = {
  id?: number;
  first_name: string;
  last_name: string;
  specializations: Specialization;
};
type MedicalCard = { id?: number; title: string; patient_id: number };
type Message = { area?: Area; from?: Account; text?: string };
type Patient = {
  id?: number;
  first_name?: string;
  last_name?: string;
  medical_cards?: MedicalCard;
};
type Role = { name?: string };
type Service = {
  id?: number;
  code: string;
  title: string;
  specialization?: Specialization;
};
type Session = {
  account?: Account;
  token?: string;
  ip?: string;
  data?: string;
};
type Specialization = { id?: number; title: string };
