/**
 * Formats a number or string number with commas for better readability
 * @param value - The number or string to format
 * @returns Formatted string with commas
 */
export const formatPrice = (value: string | number): string => {
  // Convert to string if it's a number
  const stringValue = String(value);

  // Remove any existing commas and non-numeric characters except decimal point
  const cleanValue = stringValue.replace(/[^\d.]/g, "");

  // Split by decimal point if exists
  const parts = cleanValue.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "";

  // Add commas to integer part from right to left every 3 digits
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Return with decimal part if it exists
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
