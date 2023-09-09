// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectErrorToArray = (obj: any): string[] => {
  const strings: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractStrings = (object: any) => {
    if (object?.type) delete object.type;
    if (object?.ref) delete object.ref;
    Object.values(object || {}).forEach((value) => {
      if (!value) return;
      if (typeof value === "string") {
        strings.push(value);
        return;
      }
      if (typeof value === "object") extractStrings(value);
    });
  };

  if (typeof obj === "string") return [obj];

  extractStrings(obj);
  return strings;
};
