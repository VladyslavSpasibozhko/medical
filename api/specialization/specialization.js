({
  async create({ title }) {
    console.log('specialization/create', { title });
    return { status: 'ok' };
  },
  async find({ id }) {
    console.log('specialization/find', { id });
    return { status: 'ok' };
  },
  async remove({ id }) {
    console.log('specialization/delete', { id });
    return { status: 'ok' };
  },
  async update({ title }) {
    console.log('specialization/update', { title });
    return { status: 'ok' };
  },
});
