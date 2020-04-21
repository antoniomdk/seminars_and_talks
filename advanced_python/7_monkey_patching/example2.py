from typing import *
import gorilla
import os


def monkey_patch_by_logger(module: Any, function_name: str):
    def logged(*args, **kwargs):
        print(args, kwargs)
        original = gorilla.get_original_attribute(module, function_name)
        return original(*args, **kwargs)

    settings = gorilla.Settings(allow_hit=True, store_hit=True)
    patch = gorilla.Patch(module, function_name, logged, settings)
    gorilla.apply(patch)


monkey_patch_by_logger(os.path, 'isfile')
print(os.path.isfile('my/path'))
