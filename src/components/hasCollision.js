
const hasCollision = function hasCollisionFunc(state, colliderShape) {
    let collider = colliderShape;

    let anchor = {
        x: 0,
        y: 0,
    };

    function getCollider() {
        return collider;
    }

    function setColliderShape(shape) {
        collider = shape;
    }

    function setCollisionAnchor(colAnchor) {
        anchor = colAnchor;
    }

    function intersects(shape) {
        return collider.intersects(shape);
    }

    function setPosition(pos) {
        let newPos = pos;
        if (state.getSprite && anchor) {
            const sprite = state.getSprite();
            newPos = {
                x: pos.x + sprite.width * anchor.x,
                y: pos.y + sprite.height * anchor.y,
            };
        }

        collider.setPosition(newPos);
        return pos;
    }

    function renderCollider(context) {
        if (!context) return;
        collider.render(context);
    }

    return {
        intersects,
        setCollisionAnchor,
        getCollider,
        setColliderShape,
        setPosition,
        renderCollider,
    };
};

export default hasCollision;
