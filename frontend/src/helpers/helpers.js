export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);

  if (value && hasValueInParam) {
    searchParams.set(key, value); // Update
  } else if (value) {
    searchParams.append(key, value); // Create
  } else if (hasValueInParam) {
    searchParams.delete(key); // Delete
  }

  return searchParams;
};

export const calculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shippingPrice = itemsPrice >= 100 ? 0 : 15;

  const taxPrice = Number((0.10 * itemsPrice).toFixed(2));
  
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return {
    itemsPrice: Number(itemsPrice).toFixed(2),
    shippingPrice,
    taxPrice,
    totalPrice,
  };
}