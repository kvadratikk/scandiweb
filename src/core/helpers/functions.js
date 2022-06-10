export const sortArr = (a, b, key) => {
  if (a[key] > b[key]) {
    return 1;
  }
  if (a[key] < b[key]) {
    return -1;
  }

  return 0;
};

export const findPrice = (prices, symbol, amount) => {
  return (
    prices.find((price) => price.currency.symbol === symbol).amount * amount
  ).toFixed(2);
};

export const sumItems = (cart) => {
  return cart.reduce((a, b) => a + b.amount, 0);
};

export const sumPrice = (cart, symbol) => {
  return cart
    .reduce((a, b) => {
      return (
        a +
        b.prices.find((price) => price.currency.symbol === symbol).amount *
          b.amount
      );
    }, 0)
    .toFixed(2);
};

export const setCardKey = (product) => {
  return product.selectedAttributes
    .map((product) => Object.values(product))
    .toString();
};
