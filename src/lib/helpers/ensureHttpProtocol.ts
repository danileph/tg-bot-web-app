export const ensureHttpProtocol = (url: string): string | false => {
  // Lowercase the input URL
  const lowercaseUrl = url.toLowerCase();

  // Regular expression to match "http" or "https" followed by "://" and any domain
  const urlRegex =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

  if (!lowercaseUrl.match(urlRegex)) {
    // If the provided URL does not match the pattern, add "http://"
    return false;
  }

  const urlHttpRegex = /^https?:\/\//;

  if (!lowercaseUrl.match(urlHttpRegex)) {
    // If the provided URL does not match the pattern, add "http://"
    return `http://${lowercaseUrl}`;
  }

  // If the provided URL already matches the pattern, return it as is
  return lowercaseUrl;
};
