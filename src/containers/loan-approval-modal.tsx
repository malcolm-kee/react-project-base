import { Button, Form, Modal, Select } from 'antd';
import * as React from 'react';
import { Field } from '../components/field';
import { TextField } from '../components/text-field';
import { Bank, LoanApplicationRecord } from '../constants/type';
import { createNumberArray } from '../lib/fn';
import { processLoan } from '../services/form-service';

const displaySuccessText = (text: string) =>
  import('../components/message').then(({ displaySuccessText }) =>
    displaySuccessText(text)
  );

interface LoanApprovalModalProps {
  onDismiss: () => void;
  loan: LoanApplicationRecord | null;
  bank: Bank;
  loanId: string | null;
}

export const LoanApprovalModal: React.FC<LoanApprovalModalProps> = ({
  onDismiss,
  loan,
  loanId,
  bank
}) => {
  const [approvedAmount, setAmount] = React.useState<number | null>(null);
  const [approvedTenure, setTenure] = React.useState<number | null>(null);
  const [interestRate, setInterestRate] = React.useState<number | null>(null);
  const [busy, setIsBusy] = React.useState(false);

  function reject() {
    setIsBusy(true);
    processLoan(loanId as string, bank, {
      approved: false,
      approvedLoanAmount: 0,
      approvedTenure: 0,
      interestRate: 0
    })
      .then(() => {
        setIsBusy(false);
        onDismiss();
        displaySuccessText('Loan Rejected!');
      })
      .catch(() => setIsBusy(false));
  }

  function approve() {
    setIsBusy(true);
    processLoan(loanId as string, bank, {
      approved: true,
      approvedLoanAmount: approvedAmount as number,
      approvedTenure: approvedTenure as number,
      interestRate: interestRate as number
    })
      .then(() => {
        setIsBusy(false);
        onDismiss();
        displaySuccessText('Loan Approved');
      })
      .catch(() => setIsBusy(false));
  }

  React.useEffect(() => {
    if (loan) {
      setAmount(loan.carPrice - loan.downPayment);
      setTenure(loan.tenure);
    } else {
      setAmount(null);
      setTenure(null);
    }
  }, [loan]);

  return (
    <Modal
      title="Review Loan"
      visible={!!loan}
      onOk={approve}
      okButtonProps={{
        disabled: !approvedAmount || !approvedTenure || !interestRate || busy
      }}
      onCancel={onDismiss}
      okText="Approve"
    >
      <Form>
        <TextField
          label="Approved Amount"
          name="approvedAmount"
          type="number"
          min={0}
          value={approvedAmount || ''}
          disabled={busy}
          onChangeValue={val =>
            val ? setAmount(Number(val)) : setAmount(null)
          }
          required
        />
        <Field label="Tenure (number of years)" required>
          <Select
            value={approvedTenure}
            onChange={val => setTenure(val)}
            id="tenure"
            disabled={busy}
          >
            {createNumberArray(9, 1).map(numOfYear => (
              <Select.Option value={numOfYear} key={numOfYear}>
                {numOfYear}
              </Select.Option>
            ))}
          </Select>
        </Field>
        <TextField
          label="Interest Rate"
          name="interestRate"
          type="number"
          disabled={busy}
          min={0}
          value={interestRate || ''}
          onChangeValue={val =>
            val ? setInterestRate(Number(val)) : setInterestRate(null)
          }
          suffix="%"
          required
        />
        <div>
          <Button onClick={reject} type="danger" disabled={busy}>
            Reject
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
