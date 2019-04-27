import { FormValues } from '../constants/type';

const getDb = () => import(/* webpackChunkName: "db" */ './db');

export const saveForm = (values: FormValues) =>
  getDb().then(({ saveForm }) => saveForm(values));
