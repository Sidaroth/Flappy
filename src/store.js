import createMessageBus from 'components/events/createMessageBus';

const store = {
    app: undefined,
    renderer: undefined,
    mouse: undefined,
    worldBoundary: undefined,
    count: 0,
    messageBus: createMessageBus(),
};

export default store;
