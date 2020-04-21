from typing import *
from dataclasses import dataclass
import timeit

"""
Let's define an structure that defines a configuration for a job in the cloud.
This configuration contains the following information:

- name
- commands
- docker configuration
- environment variables

Restrictions:

- Docker image and dockerfile cannot be used together
- Data should be immutable
"""


@dataclass
class DockerConfig:
    dockerfile: Optional[str]
    image: Optional[str]
    context: Optional[str]
    args: Dict[str, str]


# Evaluate dataclass construction time
timeit.timeit('JobConfig(..., ..., ..., ...,)', globals=globals())

# Evaluate namedtuple construction time
timeit.timeit('JobConfig(..., ..., ..., ...,)', globals=globals())
