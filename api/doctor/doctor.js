({
  async create({ firstName, lastName }) {
    console.log('doctor/create', { firstName, lastName });
    return { status: 'ok' };
  },
  async find({ id }) {
    console.log('doctor/find', { id });
    return { status: 'ok' };
  },
  async remove({ id }) {
    console.log('doctor/delete', { id });
    return { status: 'ok' };
  },
  async update({ firstName, lastName }) {
    console.log('doctor/update', { firstName, lastName });
    return { status: 'ok' };
  },
});
