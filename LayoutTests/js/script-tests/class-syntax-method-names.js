description('Tests for various method names');

debug('Instance methods');
shouldBe("class A { 0.1() { return 1; } }; (new A)[0.1]()", "1");
shouldBe("class A { get() { return 2; } }; (new A).get()", "2");
shouldBe("class A { set() { return 3; } }; (new A).set()", "3");
shouldBe("class A { get get() { return 4; } }; (new A).get", "4");
shouldBe("class A { get set() { return 5; } }; (new A).set", "5");
shouldBe("setterValue = undefined; class A { set get(x) { setterValue = x; } }; (new A).get = 6; setterValue", "6");
shouldBe("setterValue = undefined; class A { set set(x) { setterValue = x; } }; (new A).set = 7; setterValue", "7");

debug('');
debug('Static methods');
shouldBe("class A { static 0.1() { return 101; } }; A[0.1]()", "101");
shouldBe("class A { static get() { return 102; } }; A.get()", "102");
shouldBe("class A { static set() { return 103; } }; A.set()", "103");
shouldBe("class A { static get get() { return 104; } }; A.get", "104");
shouldBe("class A { static get set() { return 105; } }; A.set", "105");
shouldBe("setterValue = undefined; class A { static set get(x) { setterValue = x; } }; A.get = 106; setterValue", "106");
shouldBe("setterValue = undefined; class A { static set set(x) { setterValue = x; } }; A.set = 107; setterValue", "107");

debug('');
debug('Instance methods with computed names');
shouldBe("class A { ['a' + 'b']() { return 211; } }; (new A).ab()", "211");
shouldBe("class A { ['a' + 0]() { return 212; } }; (new A).a0()", "212");
shouldBe("class A { [0.1]() { return 213; } }; (new A)[0.1]()", "213");
shouldBe("class A { [1]() { return 214; } }; (new A)[1]()", "214");
function createClassWithInstanceMethod(name, value) { return class { [name]() { return value; } } };
shouldBe("A = createClassWithInstanceMethod('foo', 215); (new A)['foo']()", "215");
shouldBe("A = createClassWithInstanceMethod('foo', 216); B = createClassWithInstanceMethod('bar', 217); [(new A)['foo'](), (new B)['bar']()]", "[216, 217]");

debug('');
debug('Static methods with computed names');
shouldBe("class A { static ['a' + 'b']() { return 311; } }; A.ab()", "311");
shouldBe("class A { static ['a' + 0]() { return 312; } }; A.a0()", "312");
shouldBe("class A { static [0.1]() { return 313; } }; A[0.1]()", "313");
shouldBe("class A { static [1]() { return 314; } }; A[1]()", "314");
function createClassWithStaticMethod(name, value) { return class { static [name]() { return value; } } };
shouldBe("A = createClassWithStaticMethod('foo', 315); A['foo']()", "315");
shouldBe("A = createClassWithStaticMethod('foo', 316); B = createClassWithStaticMethod('bar', 317); [A['foo'](), B['bar']()]", "[316, 317]");

debug('');
debug('Instance methods with duplicated names');
shouldBe("class A { ab() { return 401 } ab() { return 402; } }; (new A).ab()", "402");
shouldBe("class A { 'a'() { return 403 } 'a'() { return 404; } }; (new A).a()", "404");
shouldBe("class A { 1() { return 405 } 1() { return 406; } }; (new A)[1]()", "406");
shouldBe("class A { 0.1() { return 407 } 0.1() { return 408; } }; (new A)[0.1]()", "408");
shouldBe("class A { ab() { return 409 } ['a' + 'b']() { return 410; } }; (new A).ab()", "410");
shouldBe("class A { ['ab']() { return 411 } ab() { return 412; } }; (new A).ab()", "412");
shouldBe("class A { a() { return 413 } ['a']() { return 414; } a() { return 415; } }; (new A).a()", "415");
shouldBe("class A { ['b']() { return 416 } b() { return 417; } ['b']() { return 418; } }; (new A).b()", "418");
shouldBe("class A { a() { return 419 } get a() { return 420; } }; (new A).a", "420");
shouldBe("class A { get a() { return 421 } a() { return 422 } }; (new A).a()", "422");
shouldBe("setterValue = undefined; class A { a() { return 423 } set a(x) { setterValue = x } }; (new A).a = 424; setterValue", "424");
shouldBe("setterValue = undefined; class A { set a(x) { setterValue = x } a() { return 425 } }; (new A).a()", "425");
shouldBe("setterValue = undefined; class A { get foo() { return 426 } set foo(x) { setterValue = x; } }; a = new A; a.foo = a.foo; setterValue", "426");
function valueTypes(object, proeprtyName) {
    descriptor = Object.getOwnPropertyDescriptor(object, proeprtyName);
    return ['value', 'get', 'set'].filter(function (name) { return name in descriptor; });
}
shouldBe("class A { get foo() { } foo() { } set foo(x) { } }; valueTypes((new A).__proto__, 'foo')", "['value']");
shouldBe("class A { set foo(x) { } foo() { } get foo() { } }; valueTypes((new A).__proto__, 'foo')", "['value']");
shouldBe("class A { foo() { } get foo() { } set foo(x) { } }; valueTypes((new A).__proto__, 'foo')", "['get', 'set']");
shouldBe("class A { foo() { } set foo(x) { } get foo() { } }; valueTypes((new A).__proto__, 'foo')", "['get', 'set']");
shouldBe("class A { get foo() { } set foo(x) { } foo() { } }; valueTypes((new A).__proto__, 'foo')", "['value']");
shouldBe("class A { set foo(x) { } get foo() { } foo() { } }; valueTypes((new A).__proto__, 'foo')", "['value']");

debug('');
debug('Static methods with duplicated names');
shouldBe("class A { static ab() { return 501 } static ab() { return 502; } }; A.ab()", "502");
shouldBe("class A { static 'a'() { return 503 } static 'a'() { return 504; } }; A.a()", "504");
shouldBe("class A { static 1() { return 505 } static 1() { return 506; } }; A[1]()", "506");
shouldBe("class A { static 0.1() { return 507 } static 0.1() { return 508; } }; A[0.1]()", "508");
shouldBe("class A { static ab() { return 509 } static ['a' + 'b']() { return 510; } }; A.ab()", "510");
shouldBe("class A { static ['ab']() { return 511 } static ab() { return 512; } }; A.ab()", "512");
shouldBe("class A { static a() { return 513 } static ['a']() { return 514; } static a() { return 515; } }; A.a()", "515");
shouldBe("class A { static ['b']() { return 516 } static b() { return 517; } static ['b']() { return 518; } }; A.b()", "518");
shouldBe("class A { static a() { return 519 } static get a() { return 520; } }; A.a", "520");
shouldBe("class A { static get a() { return 521 } static a() { return 522 } }; A.a()", "522");
shouldBe("setterValue = undefined; class A { static a() { return 523 } static set a(x) { setterValue = x } }; A.a = 524; setterValue", "524");
shouldBe("setterValue = undefined; class A { static set a(x) { setterValue = x } static a() { return 525 } }; A.a()", "525");
shouldBe("setterValue = undefined; class A { static get foo() { return 526 } static set foo(x) { setterValue = x; } }; A.foo = A.foo; setterValue", "526");
shouldBe("class A { static get foo() { } static foo() { } static set foo(x) { } }; valueTypes(A, 'foo')", "['value']");
shouldBe("class A { static set foo(x) { } static foo() { } static get foo() { } }; valueTypes(A, 'foo')", "['value']");
shouldBe("class A { static foo() { } static get foo() { } static set foo(x) { } }; valueTypes(A, 'foo')", "['get', 'set']");
shouldBe("class A { static foo() { } static set foo(x) { } static get foo() { } }; valueTypes(A, 'foo')", "['get', 'set']");
shouldBe("class A { static get foo() { } static set foo(x) { } static foo() { } }; valueTypes(A, 'foo')", "['value']");
shouldBe("class A { static set foo(x) { } static get foo() { } static foo() { } }; valueTypes(A, 'foo')", "['value']");

debug('');
debug('Static methods with duplicated names');
