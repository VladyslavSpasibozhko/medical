({
  async send({ fromId, text, areaId }) {
    console.log('message/send', { fromId, areaId, text });
    return { status: 'ok' };
  },
  async edit({ text, messageId }) {
    console.log('message/edit', { messageId, text });
    return { status: 'ok' };
  },
  async delete({ messageId }) {
    console.log('message/delete', { messageId });
    return { status: 'ok' };
  },
});
