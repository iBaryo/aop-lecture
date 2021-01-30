import "reflect-metadata";

class Point {
    public x: number;
    public y: number;
}

class Line {
    @Reflect.metadata('design:type', Point)
    public p1: Point;
    public p2: Point;
}

console.log(
    Reflect.getMetadata('design:type', new Line(), 'p1')
);
