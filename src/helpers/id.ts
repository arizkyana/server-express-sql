import { customAlphabet } from "nanoid";
import { nolookalikes } from "nanoid-dictionary";

export const getOrderId = () => {
  const nanoid = customAlphabet(nolookalikes, 10);
  return nanoid(5);
};

export const getSlugId = () => {
  const nanoid = customAlphabet(nolookalikes, 10);
  return nanoid(4);
};
