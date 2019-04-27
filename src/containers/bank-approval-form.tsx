import { Button, List } from 'antd';
import * as React from 'react';
import { getApprovalKey, getThemeStyles } from '../constants/mapping';
import {
  Bank,
  LoanApplication,
  LoanApplicationRecord
} from '../constants/type';
import { isNil } from '../lib/fn';
import { formDb } from '../services/db';
import { LoanApprovalModal } from './loan-approval-modal';

const mapLoan = (
  application: LoanApplication,
  bank: Bank
): LoanApplicationRecord => {
  const {
    cimbBankApproval,
    hongLeongBankApproval,
    mayBankApproval,
    publicBankApproval,
    ...otherProps
  } = application;

  const applicableApproval = application[getApprovalKey(bank)];

  return {
    ...otherProps,
    ...applicableApproval
  };
};

const Item = List.Item;

interface IBankApprovalFormProps {
  bank: Bank;
}

const BankApprovalForm: React.FC<IBankApprovalFormProps> = ({ bank }) => {
  const [loans, setLoans] = React.useState<Record<string, LoanApplication>>({});
  const [selected, selectLoan] = React.useState<
    [string, LoanApplicationRecord] | null
  >(null);

  React.useEffect(() => {
    formDb.on('value', snapshot => {
      if (snapshot) {
        setLoans(snapshot.val());
      } else {
        setLoans({});
      }
    });
  }, []);

  return (
    <div>
      <h1 style={getThemeStyles(bank)}>Loan Approvals for {bank}</h1>
      <List renderItem={() => null}>
        {Object.keys(loans).map(key => {
          const loan = loans[key] && mapLoan(loans[key], bank);
          return loan ? (
            <Item
              actions={
                isNil(loan.approved)
                  ? [
                      <Button onClick={() => selectLoan([key, loan])}>
                        Review
                      </Button>
                    ]
                  : undefined
              }
              key={key}
            >
              {loan.name}{' '}
              {isNil(loan.approved)
                ? 'Pending Review'
                : loan.approved
                ? 'Approved'
                : 'Rejected'}
            </Item>
          ) : null;
        })}
      </List>
      <LoanApprovalModal
        loan={selected && selected[1]}
        bank={bank}
        loanId={selected && selected[0]}
        onDismiss={() => selectLoan(null)}
      />
    </div>
  );
};

export default BankApprovalForm;
