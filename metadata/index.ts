import "reflect-metadata";

const MyMetadata = Symbol();

@Reflect.metadata(MyMetadata, 'i am A')
class A {

    @Reflect.metadata(MyMetadata, 'A.foo')
    public foo() {
    }

    @Reflect.metadata(MyMetadata, 'A.bar')
    public bar() {
    }
}

class B extends A {
    @Reflect.metadata(MyMetadata, 'B.bar')
    public bar() {
    }
}

const a = new A();
const b = new B();
[
    a,
    b,
    Reflect.getMetadata(MyMetadata, a.constructor),
    Reflect.getMetadata(MyMetadata, a, 'bar'),
    Reflect.getMetadata(MyMetadata, b, 'bar'),
    Reflect.getMetadata(MyMetadata, b, 'foo')
].forEach(x => console.log(x));
