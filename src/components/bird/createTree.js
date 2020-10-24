import * as PIXI from 'pixi.js';
import createState from 'utils/createState';
import canEmit from 'components/events/canEmit';
import hasSFX from 'components/audio/hasSFX';
import getRandomInt from 'math/getRandomInt';

import config from '../../config';
import { cloneDeep } from 'lodash';

const createTree = (spawnPoint, textureMap, colliderMap, scene, birdRef) => {
    const state = {};

    const colliderScale = 0.375;
    const groundLevel = 150;
    const treeTypes = 10;
    const bushTypes = 3;

    let type = `tree${getRandomInt(1, treeTypes)}`;
    let isPassed = false;

    const bird = birdRef;
    const sprite = new PIXI.Sprite(textureMap.get(type));
    const bushSprite = new PIXI.Sprite(textureMap.get(`bush${getRandomInt(1, bushTypes)}`));

    function __constructor() {
        state.setPosition(spawnPoint, config.WORLD.height - groundLevel - sprite.height);
        scene.addChild(sprite);
        scene.addChild(bushSprite);
    }

    function birdCrash() {
        if (!bird.isAlive()) return;

        state.playSFX('crashTree');
        bird.die();
    }

    function updateCollision(deltaSpeed) {
        state.colliders.forEach((collider) => {
            collider.x -= deltaSpeed;
            if (collider.intersects(bird.getCollider())) {
                birdCrash();
            }

            // collider.render(debugGfx);
        });
    }

    function update(delta, speed) {
        // debugGfx.clear();
        if (!state.isActive) return;

        const deltaSpeed = Math.round(speed * delta);
        sprite.position.x -= deltaSpeed;
        bushSprite.position.x -= deltaSpeed;
        updateCollision(deltaSpeed);

        if (Math.max(sprite.position.x + sprite.width, bushSprite.position.x + bushSprite.width) < 0) {
            state.deactivate();
        }

        if (isPassed) return;

        if (bird && bird.body.position.x > sprite.position.x + sprite.width) {
            if (bird.isAlive()) state.emit(config.EVENTS.ENTITY.PASSED);
            isPassed = true;
        }
    }

    // Whenever we reset colliders, we adjust it based on scale....
    function syncCollision() {
        state.colliders = cloneDeep(colliderMap.get(type));
        state.colliders.forEach((collider) => {
            collider.x = sprite.position.x + collider.x * colliderScale;
            collider.y *= colliderScale;
            collider.w *= colliderScale;
            collider.h *= colliderScale;
        });
    }

    function setType(t) {
        type = t;
        sprite.texture = textureMap.get(type);
        syncCollision();
    }

    function deactivate() {
        sprite.renderable = false;
        bushSprite.renderable = false;
        state.isActive = false;
    }


    function setPosition(x, y = undefined) {
        sprite.position.x = x;
        bushSprite.position.x = x;
        bushSprite.position.y = config.WORLD.height - groundLevel - bushSprite.height * 0.9;
        if (y) {
            sprite.position.y = y;
        }
        syncCollision();
    }

    function activate() {
        isPassed = false;
        sprite.renderable = true;
        bushSprite.renderable = true;
        state.isActive = true;
    }

    function destroy() {
        state.colliders = [];
        scene.removeChild(bushSprite);
        scene.removeChild(sprite);
    }

    const localState = {
        isActive: false,
        colliders: [],
        __constructor,
        setType,
        update,
        deactivate,
        setPosition,
        updateCollision,
        activate,
        destroy,
    };

    return createState('Tree', state, {
        localState,
        canEmit: canEmit(state),
        hasSFX: hasSFX(state),
    });
};

export default createTree;
