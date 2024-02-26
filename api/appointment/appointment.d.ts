declare namespace api.appointment {
  function create(parameters: {
    patientId: number;
    doctorId: number;
    cabinetId: number;
    startTime: number;
    endTime: number;
    services: Array<number>;
  }): Promise<{ status: string }>;

  function find(parameters: { id: number }): Promise<{ status: string }>;

  function remove(parameters: { id: number }): Promise<{ status: string }>;

  function update(parameters: {
    patientId?: number;
    doctorId?: number;
    cabinetId?: number;
    startTime?: number;
    endTime?: number;
    services: Array<number>;
  }): Promise<{ status: string }>;
}
