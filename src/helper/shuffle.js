export const shuffle = (array, size) => {
  let length = array.length;
  let temp, i;
  while (length) {
    i = Math.floor(Math.random() * length--);
    temp = array[length];
    array[length] = array[i];
    array[i] = temp;
  }
  if (size) {
    return array.slice(0, size);
  }
  return array;
};
