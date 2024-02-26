({
  async create({ title, code, specializationId }) {
    console.log('service/create', { title, code, specializationId });
    return { status: 'ok' };
  },
  async find({ id }) {
    console.log('service/find', { id });
    return { status: 'ok' };
  },
  async remove({ id }) {
    console.log('service/delete', { id });
    return { status: 'ok' };
  },
  async update({ title, code, specializationId }) {
    console.log('service/update', { title, code, specializationId });
    return { status: 'ok' };
  },
});
