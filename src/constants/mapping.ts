import { Bank } from './type';

export const getApprovalKey = (
  bank: Bank
):
  | 'cimbBankApproval'
  | 'hongLeongBankApproval'
  | 'mayBankApproval'
  | 'publicBankApproval' => {
  return bank === 'cimb'
    ? 'cimbBankApproval'
    : bank === 'hong-leong'
    ? 'hongLeongBankApproval'
    : bank === 'maybank'
    ? 'mayBankApproval'
    : 'publicBankApproval';
};
