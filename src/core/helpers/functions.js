export const sortArr = (a, b, key) => {
  if (a[key] > b[key]) {
    return 1;
  }
  if (a[key] < b[key]) {
    return -1;
  }

  return 0;
};

export const findPrice = (prices, symbol) => {
  return prices.find((price) => price.currency.symbol === symbol).amount;
};
