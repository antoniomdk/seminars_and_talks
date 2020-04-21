# ========== Enums =========
from typing import NamedTuple
from collections import defaultdict, namedtuple
from dataclasses import dataclass, field
from enum import Enum, unique


# ======== defaultdict ========

goals_scored = defaultdict(lambda: 0, {'Real Madrid CF': 120, 'Barcelona FC': 100})
print(goals_scored['Granada'])


class Status(Enum):
    FAILED = 1
    SUCCESS = 2


def print_status():
    for entry in Status:
        print(entry)


@unique
class Color(Enum):
    RED = 'red'
    BLUE = 'blue'
    YELLOW = 'red'


Color = Enum(value='Colors', names=('red blue red',))

# ========= namedtuple ========

"""
1. Immutable
2. Iterable (is a tuple)
3. Index access
4. Allows Unpacking 
"""
Person = namedtuple('Person', 'name age')

bob = Person(name='Bob', age=30)
print('\nRepresentation:', bob)
print('Name:', bob.name)


class Person(NamedTuple):
    name: str
    age: int


jane = Person(name='Jane', age=40)
print('\nRepresentation:', jane)
print('Name:', jane.name)

# ======== dataclasses =========

"""
1. Supported since 3.6 unofficially and 3.7 officially
"""


@dataclass
class Human:
    name: str
    age: int


@dataclass(frozen=True)
class FrozenHuman:
    name: str
    age: int


@dataclass
class Adult:
    name: str
    age: field(default=18, )

    def __post_init__(self):
        if self.age < 18:
            raise ValueError('This person is not an adult')
