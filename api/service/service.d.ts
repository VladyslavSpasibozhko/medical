declare namespace api.service {
  function create(parameters: {
    title: string;
    code: number;
    specializationId: number;
  }): Promise<{ status: string }>;

  function find(parameters: { id: number }): Promise<{ status: string }>;

  function remove(parameters: { id: number }): Promise<{ status: string }>;

  function update(parameters: {
    title?: string;
    code?: number;
    specializationId: number;
  }): Promise<{ status: string }>;
}
