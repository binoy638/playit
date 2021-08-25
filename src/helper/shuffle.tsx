import { ITrack } from "../state/types";

export const shuffle = (array: ITrack[], size: number | null = null) => {
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
