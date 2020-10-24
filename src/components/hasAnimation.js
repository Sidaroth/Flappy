import * as PIXI from 'pixi.js';

const hasAnimation = function hasAnimationFunc(state, sheet, animationKey) {
    let textureSheet = sheet;
    let currentAnimation = animationKey;
    let animationSpeed = 1;

    const animatedSprite = new PIXI.AnimatedSprite(textureSheet.animations[currentAnimation]);
    animatedSprite.animationSpeed = animationSpeed;
    animatedSprite.play();

    function setTextureSheet(texSheet) {
        textureSheet = texSheet;
    }

    function setAnimation(key) {
        currentAnimation = key;
        animatedSprite.textures = textureSheet.animations[currentAnimation];
        animatedSprite.play();
    }

    function setAnimationSpeed(speed) {
        animationSpeed = speed;
        animatedSprite.animationSpeed = animationSpeed;
    }

    function setZIndex(index) {
        animatedSprite.zIndex = index;
    }

    function setSpriteAnchor(x, y = undefined) {
        animatedSprite.anchor.set(x, y);
    }

    function getSprite() {
        return animatedSprite;
    }

    function setPosition(pos) {
        animatedSprite.position.x = pos.x;
        animatedSprite.position.y = pos.y;

        return pos;
    }

    function destroy() {
        animatedSprite.destroy();
    }

    function setRenderable(renderable) {
        animatedSprite.renderable = renderable;
    }

    return {
        setAnimation,
        setTextureSheet,
        setAnimationSpeed,
        setZIndex,
        setSpriteAnchor,
        getSprite,
        setPosition,
        setRenderable,
        destroy,
    };
};

export default hasAnimation;
