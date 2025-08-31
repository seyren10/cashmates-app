export const formatToPhp = (amount: number) => {
  return amount.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
};
