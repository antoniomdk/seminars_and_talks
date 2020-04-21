# =========== Iterators and Iterables ================


class Iterator:
    def __init__(self, n):
        self.n = n
        self.num = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.num < self.n:
            cur = self.num
            self.num += 1
            return cur
        else:
            raise StopIteration()


class Iterable:
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return iter(range(0, 10))


# ============= Generators ===============


def my_generator_func(n: int):
    i = 0
    while i < n:
        i += 1
        yield i


# Inline syntax
my_generator = (x for x in range(10))

names = list((str(value) for value in range(10)))
