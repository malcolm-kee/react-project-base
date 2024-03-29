import { List } from 'antd';
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

  const loanKeys = Object.keys(loans);

  return (
    <div>
      <h1 style={getThemeStyles(bank)}>Loan Approvals for {bank}</h1>
      <List
        dataSource={loanKeys}
        loading={loanKeys.length === 0}
        renderItem={key => {
          const loan = loans[key] && mapLoan(loans[key], bank);
          return loan ? (
            <Item
              actions={
                isNil(loan.approved)
                  ? [
                      <a
                        href="#"
                        onClick={ev => {
                          ev.preventDefault();
                          selectLoan([key, loan]);
                        }}
                      >
                        Review
                      </a>
                    ]
                  : undefined
              }
              key={key}
            >
              <Item.Meta
                title={loan.name}
                description={
                  isNil(loan.approved)
                    ? 'Pending Review'
                    : loan.approved
                    ? 'Approved'
                    : 'Rejected'
                }
              />
            </Item>
          ) : null;
        }}
        itemLayout="horizontal"
      />
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
