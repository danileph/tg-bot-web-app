export const removePTagsAndMoveNextLine = (inputString: string): string => {
  const pattern = /<p>(.*?)<\/p>/gs;
  const result = inputString.replace(pattern, (_, content) => `${content}\n`);
  return result;
};
