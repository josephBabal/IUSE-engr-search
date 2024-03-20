/**
 ** File has function for formatting dates, words, etc
 */

export type FormattedData = {
  id: number;
  original: string | undefined;
  formatted: string | undefined;
};

//* Ref: fetchCourses.ts
export const lowercaseAndReplaceSpace = (
  id: number,
  input: string
): FormattedData => {
  console.log(input, id);

  const fieldValue = input;
  const lowerCase = fieldValue.toLowerCase();
  const formattedValue = lowerCase.replace(/ /g, "-");
  console.log(formattedValue);
  const final = {
    id: id,
    original: fieldValue,
    formatted: formattedValue,
  };
  // console.log(final)
  return final;
};

export const capitalizeAndReplaceDash = (name: string): string => {
  console.log(name);
  const wordWithSpaces = name.replace(/-/g, " ");
  const formattedValue = capitalizeWords(wordWithSpaces);
  console.log(formattedValue);
  return formattedValue;
};

export const capitalizeWords = (input: string): string => {
  console.log(input);
  const exceptions = new Set(["and", "an", "a", "the", "for"]);

  //* split string into array of words
  const splitWordIntoArray = input.toLowerCase().split(" ");

  //* uppercase first letter in word if not found in exceptions
  const formattedWord = splitWordIntoArray.map((word, i) => {
    if (!exceptions.has(word)) {
      return (word = word.charAt(0).toUpperCase() + word.slice(1));
    }
  });

  console.log(formattedWord);
  return formattedWord.join(" ");
};
