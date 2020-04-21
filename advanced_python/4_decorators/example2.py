from urllib.request import urlopen
from contextlib import contextmanager, closing


# ======== Class Context Managers ========

class Request:
    def __init__(self, *args, **kwargs):
        self.args = args
        self.kwargs = kwargs

    def __enter__(self):
        self.request = urlopen(*self.args, **self.kwargs)
        return self.request

    def __exit__(self, exception_type, exception_value, traceback):
        self.request.close()
        print(traceback)
        return exception_type is None


# ======= Function context managers ==========


@contextmanager
def request(*args, **kwargs):
    resource = urlopen(*args, **kwargs)
    try:
        yield resource
    finally:
        resource.close()


with Request('https:/google.com') as page:
    print(page)


with request('https:/google.com') as page:
    print(page)


# ======= Compact form ===========

with closing(urlopen('https:/google.com')) as page:
    print(page)
