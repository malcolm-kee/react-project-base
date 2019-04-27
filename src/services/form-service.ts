import { Bank, FormValues, LoanApproval } from '../constants/type';

const getDb = () => import(/* webpackChunkName: "db" */ './db');

const defaultApprovalValue: LoanApproval = {
  approved: null,
  approvedLoanAmount: 0,
  approvedTenure: 0
};

export const saveForm = (values: FormValues) =>
  getDb().then(({ saveLoanApplication: saveForm }) =>
    saveForm({
      ...values,
      cimbBankApproval: defaultApprovalValue,
      hongLeongBankApproval: defaultApprovalValue,
      mayBankApproval: defaultApprovalValue,
      publicBankApproval: defaultApprovalValue
    })
  );

export const processLoan = (
  applicationId: string,
  bank: Bank,
  approval: LoanApproval
) =>
  getDb().then(({ processLoanApplication }) =>
    processLoanApplication(applicationId, bank, approval)
  );
