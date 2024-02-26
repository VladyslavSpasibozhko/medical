({
  async create({ title, patientId }) {
    console.log('medical_card/create', { title, patientId });
    return { status: 'ok' };
  },
  async find({ id }) {
    console.log('medical_card/find', { id });
    return { status: 'ok' };
  },
  async remove({ id }) {
    console.log('medical_card/delete', { id });
    return { status: 'ok' };
  },
  async update({ title }) {
    console.log('medical_card/update', { title });
    return { status: 'ok' };
  },
});
