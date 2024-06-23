interface AddonPrice {
  input: {
    quantity: number;
    price: number;
  };
}
export function addonPrice({ input }: AddonPrice) {
  return Number((input.quantity * input.price).toFixed(2));
}
