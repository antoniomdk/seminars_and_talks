
class Chainable {
  constructor(value) {
    this.value = value;
  }

  add(x) => {
    this.value += x;
    return this;
  }

  sub(x) => {
    this.value -= x;
    return this;
  }

  mult(x) => {
    this.value *= x;
    return this;
  }
}


const chainable = Chainable(0);

chainable // === 10
  .add(10)
  .sub(5)
  .mult(2);
