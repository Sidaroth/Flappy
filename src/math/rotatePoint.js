import * as PIXI from 'pixi.js';

/**
 * Rotates a point by a given radian. A pivot may be specified.
 */
export default function rotatePoint(point, radians, pivot = new PIXI.Point()) {
    const res = new PIXI.Point();
    res.x = ((point.x - pivot.x) * Math.cos(radians)) - ((point.y - pivot.y) * Math.sin(radians)) + pivot.x;
    res.y = ((point.x - pivot.x) * Math.sin(radians)) + ((point.y - pivot.y) * Math.cos(radians)) + pivot.y;

    return res;
}
