const getStorage = () => import(/* webpackChunkName: "storage" */ './storage');

export const uploadImage = (
  imageName: string,
  file: File,
  onProgress?: (pct: number) => void
) =>
  getStorage().then(({ uploadImage }) =>
    uploadImage(imageName, file, onProgress)
  );

export const removeImage = (imageName: string) =>
  getStorage().then(({ removeImage }) => removeImage(imageName));
