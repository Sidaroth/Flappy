import Vector from '../math/Vector';

export default class Circle {
    x;
    y;
    r;
    r2;

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.r2 = this.r * this.r;
    }

    setPosition(vec) {
        this.x = vec.x;
        this.y = vec.y;
    }

    contains(point) {
        const length = new Vector(point.x - this.x, point.y - this.y).squaredLength();
        return length < this.r2;
    }

    getRadius() {
        return this.r;
    }

    getPosition() {
        return new Vector(this.x, this.y);
    }

    render(context) {
        context.lineStyle(5, 0xFF0000);
        context.drawCircle(this.x, this.y, this.r);
    }
}
