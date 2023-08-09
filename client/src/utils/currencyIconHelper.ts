export const currencyIconHelper: (currency: string) => string = (currency) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "TRY":
      return "₺";
    default:
      return " ";
  }
};
