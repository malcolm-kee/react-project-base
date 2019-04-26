import 'firebase/database';
import { firebase } from './firebase';
import { FormValues } from '../constants/type';

const database = firebase.database();

const formDb = database.ref('forms');

export const saveForm = (values: FormValues) =>
  formDb.child(values.id).set(values);
