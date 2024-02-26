declare namespace api.specialization {
  function create(parameters: { title: string }): Promise<{ status: string }>;

  function find(parameters: { id: number }): Promise<{ status: string }>;

  function remove(parameters: { id: number }): Promise<{ status: string }>;

  function update(parameters: { title?: string }): Promise<{ status: string }>;
}
