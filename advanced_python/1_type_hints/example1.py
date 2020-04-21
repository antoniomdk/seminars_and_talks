# =========== Typed functions ==========

def my_function(x: int, y: str) -> int:
    return x + int(y)


# =========== Typed methods ==========

class MyClass:
    def __init__(self, x: str, y: dict):
        pass

    def echo(self, value: str):
        print(value)


# =========== Typed class (inheritance) ==========

class MyClass(Exception):
    def __init__(self, *args, **kwargs):
        super(self, *args, **kwargs)


# =========== All primitives and classes supported ==========

def function(
        a: dict,
        b: list,
        c: tuple,
        d: int,
        e: float,
        g: bool,
        h: object,
        i: MyClass,
        j: Exception):
    pass
