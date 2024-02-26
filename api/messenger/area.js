({
  async find({ areaId }) {
    console.log('area/find', { areaId });
    return { status: 'ok' };
  },
  async create({ ownerId, name }) {
    console.log('area/create', { ownerId, name });
    return { status: 'ok' };
  },
  async delete({ areaId }) {
    console.log('area/delete', { areaId });
    return { status: 'ok' };
  },
  async addMember({ areaId, memberId }) {
    console.log('area/addMember', { areaId, memberId });
    return { status: 'ok' };
  },
  async deleteMember({ areaId, memberId }) {
    console.log('area/deleteMember', { areaId, memberId });
    return { status: 'ok' };
  },
});
