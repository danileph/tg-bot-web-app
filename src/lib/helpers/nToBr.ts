export function nToBr(inputString: string): string {
  // Define the regular expression pattern
  const pattern = /\n/g;

  // Use the replace method to replace "\n" with "<br />"
  const resultString = inputString.replace(pattern, "<br />");

  return resultString;
}
