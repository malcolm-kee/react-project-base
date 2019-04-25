const getStorage = () => import(/* webpackChunkName: "storage" */ './storage');

export const uploadImage = (imageName: string, file: File) =>
  getStorage().then(({ uploadImage }) => uploadImage(imageName, file));

export const removeImage = (imageName: string) =>
  getStorage().then(({ removeImage }) => removeImage(imageName));
