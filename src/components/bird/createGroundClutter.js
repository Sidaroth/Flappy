import * as PIXI from 'pixi.js';
import createState from 'utils/createState';
import getRandomInt from 'math/getRandomInt';
import config from '../../config';
import store from '../../store';

const createGroundClutter = (spawnPoint, container, textureMap = store.textureMap) => {
    const state = {};

    const groundLevel = 150;
    const type = `clutter${getRandomInt(1, 11)}`;
    const sprite = new PIXI.Sprite(textureMap.get(type));

    // Jitter deviance so that every single clutter object isn't in the same Y position.
    const jitterPercent = 5;
    const jitter = 1 - (getRandomInt(0, 2 * jitterPercent) - jitterPercent) / 100;

    function __constructor() {
        state.setPosition(spawnPoint, (config.WORLD.height - groundLevel - sprite.height) * jitter);
        container.addChild(sprite);
    }

    function update(delta, speed) {
        if (!state.isActive) return;

        const deltaSpeed = Math.round(speed * delta);
        sprite.position.x -= deltaSpeed;

        if (sprite.position.x + sprite.width < 0) {
            state.deactivate();
        }
    }


    function deactivate() {
        sprite.renderable = false;
        state.isActive = false;
    }


    function setPosition(x, y = undefined) {
        sprite.position.x = x;
        if (y) {
            sprite.position.y = y;
        }
    }

    function activate() {
        sprite.renderable = true;
        state.isActive = true;
    }

    function destroy() {
        state.colliders = [];
        container.removeChild(sprite);
    }

    const localState = {
        isActive: false,
        type,
        __constructor,
        update,
        deactivate,
        setPosition,
        activate,
        destroy,
    };

    return createState('GroundClutter', state, {
        localState,
    });
};

export default createGroundClutter;
