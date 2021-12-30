// tslint:disable-next-line: variable-name
export const validateBody = (customer_id: string, product_id: string) => {
  if (!customer_id) {
    throw new Error("customer_id cannot be blank");
  }

  if (!product_id) {
    throw new Error("product_id cannot be blank");
  }
};
