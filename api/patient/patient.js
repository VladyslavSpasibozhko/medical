({
  async create({ firstName, lastName }) {
    console.log('patient/create', { firstName, lastName });
    return { status: 'ok' };
  },
  async find({ id }) {
    console.log('patient/find', { id });
    return { status: 'ok' };
  },
  async remove({ id }) {
    console.log('patient/delete', { id });
    return { status: 'ok' };
  },
  async update({ firstName, lastName }) {
    console.log('patient/update', { firstName, lastName });
    return { status: 'ok' };
  },
});
