import 'firebase/database';
import { FormValues } from '../constants/type';
import { getId } from '../lib/id';
import { firebase } from './firebase';

const database = firebase.database();

const formDb = database.ref('forms');

export const saveForm = (values: FormValues) =>
  formDb.child(String(getId())).set(values);
