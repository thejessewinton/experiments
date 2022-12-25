export const makePlural = (string: string, number: number) => {
  if (number === 1) {
    return string;
  } else {
    return `${string}s`;
  }
};
