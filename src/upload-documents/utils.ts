export const editFileName = file => {
  const ext = file.substr(file.lastIndexOf(".") + 1);
  return `${Date.now().toString()}-${Math.floor(Math.random() * 1000)}.${ext}`;
};
