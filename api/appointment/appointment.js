({
  async create(args) {
    console.log('appointment/create', args);
    return { status: 'ok' };
  },
  async find({ id }) {
    console.log('appointment/find', { id });
    return { status: 'ok' };
  },
  async remove({ id }) {
    console.log('appointment/delete', { id });
    return { status: 'ok' };
  },
  async update(args) {
    console.log('appointment/update', args);
    return { status: 'ok' };
  },
});
