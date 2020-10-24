import getUUID from 'math/getUUID';
import createState from 'utils/createState';

const createListener = function createListenerFunc(event, fn, once, emitState) {
    const state = {};

    function drop() {
        if (state.dropped) return;
        emitState.off(state);
        state.dropped = true;
    }

    const localState =
    {
        // props
        id: getUUID(),
        dropped: false,
        once,
        event,
        fn: !once ? fn : (evt) => {
            fn(evt);
            state.drop();
        },
        // methods
        drop,
    };

    return createState('Listener', state, { localState });
};

export default createListener;
