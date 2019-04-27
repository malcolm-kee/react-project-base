import 'firebase/database';
import { getApprovalKey } from '../constants/mapping';
import { Bank, LoanApplication, LoanApproval } from '../constants/type';
import { getId } from '../lib/id';
import { firebase } from './firebase';

const database = firebase.database();

export const formDb = database.ref('forms');

export const saveLoanApplication = (values: LoanApplication) => {
  return formDb.child(String(getId())).set(values);
};

export const processLoanApplication = (
  applicationId: string,
  bank: Bank,
  approval: LoanApproval
) => {
  const approvalKey = getApprovalKey(bank);

  return formDb.child(applicationId).update({
    [approvalKey]: approval
  });
};
