from typing import *

"""
1. Define a function decorator to record the execution time of a function

You can use the function time() from module time
"""

"""
2. Define a class decorator named "frozen" that disables all attribute mutations
"""


def frozen(cls: Type):
    pass


@frozen
class DockerConfig:
    dockerfile: Optional[str]
    image: Optional[str]
    context: Optional[str]
    args: Dict[str, str]

    def __init__(self, dockerfile, image, context, args):
        self.dockerfile = dockerfile
        self.image = image
        self.context = context
        self.args = args


my_docker_config = DockerConfig(dockerfile="Dockerfile", image=None, context='.', args={})

# This should raises an exception
my_docker_config.dockerfile = "OtherDockerfile"



"""
3. Define a metaclass to convert any class into a singleton.
"""


class Singleton(type):
    def __new__(cls, name, bases, dct):
        # Hint: Do not touch this
        x = super().__new__(cls, name, bases, dct)
        x.to_json = lambda self: json.dumps(vars(self))
        return x

    def __init__(cls, name, bases, dct):
        # Hint: Do not touch this
        super(Singleton, cls).__init__(name, bases, dct)

    def __call__(cls, *args, **kwargs):
        print('Creating a new instance')


class GameState:
    score: int


print(GameState.instance.scores)
