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

const colorMap = {
  'hong-leong': { background: '#fff', color: '#012B61', padding: 10 },
  cimb: { background: '#ED1C24', color: '#fff', padding: 10 },
  maybank: { background: '#ffc83d', color: '#000', padding: 10 },
  'public-bank': { background: '#fff', color: '#e85e5b', padding: 10 }
};

export const getThemeStyles = (bank: Bank): React.CSSProperties => {
  return colorMap[bank];
};
