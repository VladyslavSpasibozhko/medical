'use strict';

const transport = {};

transport.http = (url) => (structure) => {
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) =>
        new Promise((resolve, reject) => {
          fetch(`${url}/api/${name}/${method}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ args }),
          }).then((res) => {
            if (res.status === 200) resolve(res.json());
            else reject(new Error(`Status Code: ${res.status}`));
          });
        });
    }
  }
  return Promise.resolve(api);
};

transport.ws = (url) => (structure) => {
  const socket = new WebSocket(url);
  const api = {};
  const services = Object.keys(structure);
  for (const name of services) {
    api[name] = {};
    const service = structure[name];
    const methods = Object.keys(service);
    for (const method of methods) {
      api[name][method] = (...args) =>
        new Promise((resolve) => {
          const packet = { name, method, args };
          socket.send(JSON.stringify(packet));
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            resolve(data);
          };
        });
    }
  }
  return new Promise((resolve) => {
    socket.addEventListener('open', () => resolve(api));
  });
};

const scaffold = (url) => {
  const protocol = url.startsWith('ws:') ? 'ws' : 'http';
  return transport[protocol](url);
};

const schema = {
  auth: {
    signin: ['login', 'password'],
    signout: [],
    restore: ['token'],
  },
  appointment: {
    create: [
      'patientId',
      'doctorId',
      'cabinetId',
      'startTime',
      'endTime',
      'services',
    ],
    find: ['id'],
    remove: ['id'],
    update: [
      'id',
      'patientId',
      'doctorId',
      'cabinetId',
      'startTime',
      'endTime',
      'services',
    ],
  },
  doctor: {
    create: ['firstName', 'lastName'],
    find: ['id'],
    remove: ['id'],
    update: ['id', 'firstName', 'lastName'],
  },
  medicalCard: {
    create: ['title'],
    find: ['id'],
    remove: ['id'],
    update: ['id', 'title'],
  },
  area: {
    find: ['id'],
    create: ['id', 'name'],
    remove: ['id'],
    addMember: ['areaId', 'memberId'],
    deleteMember: ['areaId', 'memberId'],
  },
  message: {
    send: ['id', 'fromId', 'text'],
    edit: ['id', 'text'],
    remove: ['id'],
  },
  patient: {
    create: ['firstName', 'lastName'],
    find: ['id'],
    remove: ['id'],
    update: ['id', 'firstName', 'lastName'],
  },
  service: {
    create: ['title', 'code', 'specializationId'],
    find: ['id'],
    remove: ['id'],
    update: ['id', 'title', 'code', 'specializationId'],
  },
  specialization: {
    create: ['title'],
    find: ['id'],
    remove: ['id'],
    update: ['id', 'title'],
  },
};

const block = ({ title }) => {
  const container = document.createElement('div');

  container.style.padding = '20px 40px';
  container.style.marginTop = '20px';
  container.style.border = '1px solid grey';

  const heading = document.createElement('h3');
  heading.textContent = title;
  container.append(heading);

  return container;
};

const textarea = ({ method, args }) => {
  const container = document.createElement('div');
  const title = document.createElement('p');
  const subtitle = document.createElement('p');

  const titleContent = ['METHOD', ':', method].join(' ');
  title.textContent = titleContent;

  const subtitleContent = ['ARGUMENTS', ':', JSON.stringify(args)].join(' ');
  subtitle.textContent = titleContent;

  container.append(title);
  container.append(subtitleContent);

  const input = document.createElement('textarea');
  const inputContent = args.map((key) => `"${key}": ""`);

  input.style.minHeight = `${inputContent.length * 28}px`;
  input.style.minWidth = '100%';
  input.style.marginTop = '20px';
  input.value = `{ ${inputContent.join(',')} }`;
  container.append(input);

  return { input: container, value: () => input.value };
};

const button = () => {
  const btn = document.createElement('button');
  btn.textContent = 'Request';
  btn.style.marginTop = '10px';
  return btn;
};

window.addEventListener('load', async () => {
  const api = await scaffold('http://localhost:8001')(schema);

  for (const entity in schema) {
    const container = block({ title: entity });
    const entitySchema = schema[entity];

    for (const method in entitySchema) {
      const { input, value } = textarea({
        method,
        args: entitySchema[method],
      });

      const btn = button();

      btn.addEventListener('click', async () => {
        const values = JSON.parse(value());
        const result = await api[entity][method](values);
        console.log(result);
      });

      container.append(input);
      container.append(btn);
    }

    document.body.appendChild(container);
  }
});
