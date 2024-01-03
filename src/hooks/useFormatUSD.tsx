export default function useFormatUSD() {
  return function (value) {
    if (!value && value !== 0) {
      return "";
    }
    const numericValue = typeof value === "number" ? value : parseFloat(value);

    const formattedValue = numericValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedValue;
  };
}
