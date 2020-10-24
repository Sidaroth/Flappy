import * as PIXI from 'pixi.js';

// Abstraction around PIXI.Containers, intended to be used as a component in levels.
const hasContainer = function hasContainerFunc(state) {
    const container = new PIXI.Container();

    function addChild(child) {
        container.addChild(child);
    }

    function addChildAt(child, index) {
        container.addChildAt(child, index);
    }

    function removeChild(child) {
        container.removeChild(child);
    }

    // NOTE It's possible to send in start and end indexes.
    function removeAllChildren() {
        container.removeChildren();
    }

    function getContainer() {
        return container;
    }

    function updateZIndexes() {
        container.sortChildren();
    }

    function destroy() {
        container.removeChildren();
        container.destroy();
    }

    return {
        addChild,
        addChildAt,
        removeChild,
        removeAllChildren,
        getContainer,
        updateZIndexes,
        destroy,
    };
};

export default hasContainer;
