export interface FormValues {
  name: string;
  id: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  postalCode: string;
  city: string;
  state: string;
  mobileNumber: string;
  email: string;
  company: string;
  companyHrNumber: string;
  salary: string;
  carPrice: number;
  downPayment: number;
  tenure: number;
  icImage: string;
  licenseImage: string;
  salarySlipFor3MonthsImages: string[];
  savingStatementsFor3MonthsImages: string[];
}

export interface LoanApproval {
  approved: boolean | null;
  approvedLoanAmount: number;
  approvedTenure: number;
  interestRate: number;
  acceptedByCustomer?: boolean;
}

export type Bank = 'hong-leong' | 'cimb' | 'maybank' | 'public-bank';

export interface LoanApplication extends FormValues {
  hongLeongBankApproval: LoanApproval;
  cimbBankApproval: LoanApproval;
  mayBankApproval: LoanApproval;
  publicBankApproval: LoanApproval;
}

export type LoanApplicationRecord = FormValues & LoanApproval;
