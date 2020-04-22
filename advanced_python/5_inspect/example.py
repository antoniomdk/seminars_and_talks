from inspect import signature, isfunction, isgeneratorfunction
from typing import *


Factory = Callable[[], Any]


# ========== Runtime type checking ==========

def message_factory_generator():
    yield 'Hello'
    yield 'World'


def message_factory_singleton():
    return 'Hello World'


def send_messages(messages: Union[Factory, Any]) -> None:
    if isfunction(messages):
        if isgeneratorfunction(messages):
            for x in messages():
                print(x)
        else:
            print(messages())
    else:
        print(messages)


send_messages(message_factory_generator)
send_messages(message_factory_singleton)
send_messages('Hello World')


# ========== Getting function signature in runtime =========

def get_default_params_from_func(func):
    sig = signature(func)
    return {
        param.name: param.default for param in sig.parameters.values()
        if param.kind == param.POSITIONAL_OR_KEYWORD and param.default != param.empty
    }
