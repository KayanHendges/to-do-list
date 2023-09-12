export const getShortName = (name: string) => {
  const names = name.split(" ");

  if (names.length > 1) return `${names[0]} ${names.pop()?.substring(0, 1)}.`;

  return name;
};
