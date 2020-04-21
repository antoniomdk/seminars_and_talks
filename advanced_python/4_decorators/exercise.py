from typing import *
from functools import wraps, partial
import types

T = TypeVar('T', int, str, float, list, tuple)


# ======== Simple decorator ========


def logged(func):
    def wrapped(*args, **kwargs):
        print(args, kwargs)
        return func(*args, **kwargs)

    return wrapped


@logged
def my_sum(x: T, y: T) -> T:
    """ It adds two summable items together"""
    return x + y


my_sum([100, 200], [300, 400])

print(my_sum.__module__)
print(my_sum.__name__)
print(my_sum.__doc__)
print(my_sum.__qualname__)
print(my_sum.__annotations__)


def better_logged(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        print(args, kwargs)
        return func(*args, **kwargs)

    return wrapped


@better_logged
def my_sum(x: T, y: T) -> T:
    """ It adds two summable items together"""
    return x + y


print(my_sum.__module__)
print(my_sum.__name__)
print(my_sum.__doc__)
print(my_sum.__qualname__)
print(my_sum.__annotations__)


# ========== Decorator with arguments ==========


def logged_nested(pre_message: str, post_message: str):
    def decorator(function):
        def wrapper(*args, **kwargs):
            print(pre_message)
            result = function(*args, **kwargs)
            print(post_message)
            return result

        return wrapper

    return decorator


def logged_with_partial(pre_message: str, post_message: str, func: Optional[Callable] = None):
    if func is None:
        return partial(logged_with_partial, pre_message, post_message)

    @wraps(func)
    def wrapper(*args, **kwargs):
        print(pre_message)
        result = func(*args, **kwargs)
        print(post_message)
        return result

    return wrapper


@logged_nested(pre_message="Hello", post_message="World")
def my_sum1(x: T, y: T) -> T:
    """ It adds two summable items together"""
    return x + y


@logged_with_partial(pre_message="Hello", post_message="World")
def my_sum2(x: T, y: T) -> T:
    """ It adds two summable items together"""
    return x + y


my_sum1(100, 200)
my_sum2(100, 200)


# =========== Class decorator =============

def time_all_class_methods(cls: Type):
    class NewClass(object):
        def __init__(self, *args, **kwargs):
            self.instance = cls(*args, **kwargs)

        def __getattribute__(self, s):
            # If its a class method, do nothing
            try:
                x = super(NewClass, self).__getattribute__(s)
            except AttributeError:
                pass
            else:
                return x

            x = self.instance.__getattribute__(s)

            if isinstance(x, types.MethodType):
                return logged(x)
            else:
                return x
    return NewClass
