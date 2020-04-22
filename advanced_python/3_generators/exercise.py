from itertools import islice


class LogProcessor(object):
    def __init__(self, file):
        self._file = open(file)
        self._filters = []

    def add_filter(self, new_filter):
        if callable(new_filter):
            self._filters.append(new_filter)

    def process(self):
        # this is the pattern for creating a generator
        # pipeline, we start with a generator then wrap
        # each consecutive generator with the pipeline itself
        pipeline = self._file
        for new_filter in self._filters:
            pipeline = new_filter(pipeline)
        return pipeline


def parser(lines):
    """Split each line based on spaces and
    yield the resulting list.
    """
    for line in lines:
        yield [part.strip('"[]') for part in line.split(' ')]


def mapper(lines):
    """Convert each line to a dict
    """
    for line in lines:
        tmp = {}
        tmp['ip_address'] = line[0]
        tmp['timestamp'] = line[1]
        tmp['timezone'] = line[2]
        tmp['method'] = line[3]
        tmp['request'] = line[4]
        tmp['version'] = line[5]
        tmp['status'] = int(line[6])
        tmp['size'] = int(line[7])
        yield tmp


def status_filter(lines):
    """Filter out lines whose status code is not 200"""
    pass


def method_filter(lines):
    """Filter out lines whose method is not 'GET' """
    pass


# setup the processor
processor = LogProcessor('./sample.log')

# this is the order we want the functions to run
processor.add_filter(parser)
processor.add_filter(mapper)
processor.add_filter(status_filter)
processor.add_filter(method_filter)

# process() returns the generator pipeline
for line in islice(processor.process(), 10):
    print(line)
