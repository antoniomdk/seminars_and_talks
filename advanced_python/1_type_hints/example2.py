from typing import *
from enum import Enum
from dataclasses import dataclass


# =========== Any ==========

def my_function(x: Any, y: Any) -> int:
    return x + int(y)


def func_a(item: object) -> None:
    item.magic()


def func_b(item: Any) -> None:
    item.magic()


# =========== Typed Containers 1 ==========

@dataclass
class DockerConfig:
    dockerfile: Optional[str]
    image: Optional[str]
    context: Optional[str]
    args: Dict[str, str]


my_docker_config = DockerConfig(dockerfile=10, args=[], context=".", image=[])


# =========== Typed Containers 2 ==========

class OptimizationDirection(Enum):
    MINIMIZE = 'minimize'
    MAXIMIZE = 'maximize'


@dataclass
class Metric:
    name: str
    direction: OptimizationDirection


@dataclass
class Config:
    timeout_per_trial: Optional[int]
    param_space: Union[Dict, str]
    metric: Union[Metric, List[Metric]]


my_config = Config(timeout_per_trial="",
                   param_space="",
                   metric=Metric(name="Metric", direction=OptimizationDirection.MAXIMIZE))

my_config = Config(timeout_per_trial=1,
                   param_space=[],
                   metric=[Metric(name="Metric", direction=OptimizationDirection.MAXIMIZE)])


def produce_two_results(my_string: str) -> Tuple[str, str]:
    return tuple(my_string.split(' '))


def produce_two_results(my_string: str) -> Tuple[str, str]:
    chunks = my_string.split(' ')
    return chunks[0], chunks[1]


def produce_two_results(my_string: str) -> Tuple[str, ...]:
    return tuple(my_string.split(' '))
