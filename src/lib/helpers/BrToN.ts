export function brToN(inputString: string): string {
  // Define the regular expression pattern
  const pattern = /<br\s*\/?>/g;

  // Use the replace method to replace "<br />" with "\n"
  const resultString = inputString.replace(pattern, "\n");

  return resultString;
}
