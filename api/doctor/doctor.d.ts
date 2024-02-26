declare namespace api.doctor {
  function create(parameters: {
    firstName: string;
    lastName: string;
  }): Promise<{ status: string }>;

  function find(parameters: { id: number }): Promise<{ status: string }>;

  function remove(parameters: { id: number }): Promise<{ status: string }>;

  function update(parameters: {
    firstName?: string;
    lastName?: string;
  }): Promise<{ status: string }>;
}
