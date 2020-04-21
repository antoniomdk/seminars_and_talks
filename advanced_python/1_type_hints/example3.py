from typing import *
from functools import reduce


# =========== Aliases and TypeVar ==========

T = TypeVar('T', int, float)

Matrix = List[List[T]]


def my_function(m: Matrix[int]) -> int:
    return reduce(lambda acc, x: acc + sum(x), m, initial=0)


def my_function_failed(m: int) -> int:
    return reduce(lambda acc, x: acc + sum(x), m, initial=0)


# =========== Structural Typing ==========

def generic(m: Sequence[Sequence[T]]) -> T:
    return reduce(lambda acc, x: acc + sum(x), m, initial=0)


generic([['0']])
generic([[0]])
generic(((0,),))


def iterate(iterator: Iterable):
    for elem in iterator:
        print(elem)


class Employee:
    pass


def notify_by_email(employees: Iterable[Employee], emails: Mapping[Employee, str]) -> None:
    for employee in employees:
        print(emails[employee])
