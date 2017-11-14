export const truncate = (input = "", length = 14, pad = "...") => {
  const words = input.split(" ");

  return words.length >= length
    ? words
        .slice(0, length)
        .join(" ")
        .concat(pad)
    : input;
};

export const numberToLocale = number => number.toLocaleString("nl");

export const toKeyedObject = array => {
  const keyedObject = {};
  array.forEach(obj => {
    keyedObject[obj.id] = obj;
  });
  return keyedObject;
};
