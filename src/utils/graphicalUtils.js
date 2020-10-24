const drawVector = function drawVectorFunc(gfxContext, from, vector, color = 0xff0000) {
    gfxContext.beginFill(color);
    gfxContext.lineStyle(3, color);
    gfxContext.moveTo(from.x, from.y);
    gfxContext.lineTo(from.x + vector.x, from.y + vector.y);
    gfxContext.endFill();
};

export default drawVector;
