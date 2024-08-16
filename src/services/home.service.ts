export type THome = {
  message: string;
};

export const getMessage = (): Promise<THome> => {
  return Promise.resolve({
    message: "OK",
  });
};
