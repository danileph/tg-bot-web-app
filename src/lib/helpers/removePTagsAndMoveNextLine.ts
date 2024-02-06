// export const removePTagsAndMoveNextLine = (inputString: string): string => {
//   const pattern = /<p>(.*?)<\/p>/gs;
//   const result = inputString.replace(pattern, (_, content) => `${content}\n`);
//   return result;
// };

export const removePTagsAndMoveNextLine = (inputString: string): string => {
  // Replace </p> followed by <p> with </p>\n<p>
  let result = inputString.replace(/<\/p>\s*<p>/g, "</p>\n<p>");

  // Remove remaining <p> and </p> tags
  result = result.replace(/<\/?p>/g, "");

  return result;
};
