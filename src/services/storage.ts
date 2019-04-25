import 'firebase/storage';
import { firebase } from './firebase';

const storage = firebase.storage().ref();

const imageStorage = storage.child('images');

export const uploadImage = (imageName: string, file: File): Promise<string> =>
  new Promise((fulfill, reject) => {
    const uploadTask = imageStorage.child(imageName).put(file);

    uploadTask.on(
      'state_changed',
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      reject,
      () => fulfill(uploadTask.snapshot.ref.getDownloadURL())
    );
  });

export const removeImage = (imageName: string): Promise<void> =>
  imageStorage.child(imageName).delete();
