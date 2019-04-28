import { Button, Card, Col, Icon, Row, Statistic, Tag } from 'antd';
import * as React from 'react';
import { LoanApplication, LoanApproval } from '../constants/type';
import { isNil } from '../lib/fn';
import { formDb } from '../services/db';

const displayText = (text: string) =>
  import('../components/message').then(({ displaySuccessText }) =>
    displaySuccessText(text)
  );

const getApprovalStatusText = (approval: LoanApproval | null) =>
  isNil(approval)
    ? ''
    : isNil(approval.approved)
    ? 'Pending Review'
    : approval.approved
    ? 'Approved'
    : 'Rejected';

const getApprovalStatusColor = (approval: LoanApproval | null) =>
  isNil(approval) || isNil(approval.approved)
    ? undefined
    : approval.approved
    ? '#87d068'
    : 'red';

const getRepaymentAmount = (approval: LoanApproval) =>
  (approval.approvedLoanAmount +
    (approval.approvedLoanAmount *
      approval.interestRate *
      approval.approvedTenure) /
      100) /
  (approval.approvedTenure * 12);

const isApproved = (approval: LoanApproval | null) =>
  !!(approval && approval.approved);

const ApprovalStatusCard: React.FC<{
  bank: string;
  approval: LoanApproval | null;
  onAccept: () => void;
  isLoanAccepted: boolean;
}> = ({ bank, approval, onAccept, isLoanAccepted }) => {
  const isLoading = isNil(approval);
  const isLoanApproved = isApproved(approval);
  const isAccepted = !!(approval && approval.acceptedByCustomer);

  return (
    <Card
      title={bank}
      loading={isLoading}
      extra={
        isLoanAccepted ? (
          isAccepted ? (
            <Tag color="#87d068">Selected</Tag>
          ) : null
        ) : (
          <Tag color={getApprovalStatusColor(approval)}>
            {getApprovalStatusText(approval)}
          </Tag>
        )
      }
      actions={
        isLoanAccepted
          ? undefined
          : [
              isLoanApproved ? (
                <span>
                  <Button type="primary" onClick={onAccept}>
                    Accept <Icon type="check" />
                  </Button>
                </span>
              ) : isNil(approval && approval.approved) ? (
                <Button type="ghost" disabled>
                  Pending Review
                </Button>
              ) : (
                <Button type="ghost" disabled>
                  Rejected
                </Button>
              )
            ]
      }
    >
      {approval && (
        <>
          <Row gutter={8}>
            <Col lg={8} sm={12} xs={24}>
              <Statistic
                title="Approved Amount"
                value={isLoanApproved ? approval.approvedLoanAmount : 'N/A'}
                prefix={isLoanApproved ? 'RM' : undefined}
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <Statistic
                title="Approved Tenure"
                value={isLoanApproved ? approval.approvedTenure : 'N/A'}
                suffix={
                  isLoanApproved
                    ? approval.approvedTenure > 1
                      ? 'years'
                      : 'year'
                    : undefined
                }
              />
            </Col>
            <Col lg={8} sm={12} xs={24}>
              <Statistic
                title="Interest Rate"
                value={isLoanApproved ? approval.interestRate : 'N/A'}
                suffix={isLoanApproved ? '%' : undefined}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={{ span: 8, push: 8 }} sm={{ span: 12, push: 6 }} xs={24}>
              <Statistic
                title="Monthly Repayment"
                value={isLoanApproved ? getRepaymentAmount(approval) : 'N/A'}
                prefix={isLoanApproved ? 'RM' : undefined}
                precision={2}
              />
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

interface ApprovalStatusOverviewProps {
  applicationId: string;
}

const ApprovalStatusOverview: React.FC<ApprovalStatusOverviewProps> = ({
  applicationId
}) => {
  const [loan, setLoan] = React.useState<LoanApplication | null>(null);

  function handleAccept(
    approvalKey:
      | 'hongLeongBankApproval'
      | 'cimbBankApproval'
      | 'mayBankApproval'
      | 'publicBankApproval'
  ) {
    formDb
      .child(applicationId)
      .update({
        [`${approvalKey}/acceptedByCustomer`]: true
      })
      .then(() => displayText('Loan Accepted!'));
  }

  React.useEffect(() => {
    formDb.child(applicationId).on('value', snapshot => {
      if (snapshot) {
        setLoan(snapshot.val());
      } else {
        setLoan(null);
      }
    });
  }, [applicationId]);

  const isAccepted = React.useMemo(
    () =>
      loan
        ? loan.hongLeongBankApproval.acceptedByCustomer ||
          loan.cimbBankApproval.acceptedByCustomer ||
          loan.mayBankApproval.acceptedByCustomer ||
          loan.publicBankApproval.acceptedByCustomer ||
          false
        : false,
    [loan]
  );

  return (
    <div>
      <h2 style={{ padding: 8 }}>
        Approval Overview {loan && `for ${loan.name}`}
      </h2>
      <Row gutter={8}>
        <Col md={12} xs={24}>
          <ApprovalStatusCard
            bank="Hong Leong Bank"
            approval={loan && loan.hongLeongBankApproval}
            onAccept={() => handleAccept('hongLeongBankApproval')}
            isLoanAccepted={isAccepted}
          />
        </Col>
        <Col md={12} xs={24}>
          <ApprovalStatusCard
            bank="CIMB Bank"
            approval={loan && loan.cimbBankApproval}
            onAccept={() => handleAccept('cimbBankApproval')}
            isLoanAccepted={isAccepted}
          />
        </Col>
        <Col md={12} xs={24}>
          <ApprovalStatusCard
            bank="Maybank"
            approval={loan && loan.mayBankApproval}
            onAccept={() => handleAccept('mayBankApproval')}
            isLoanAccepted={isAccepted}
          />
        </Col>
        <Col md={12} xs={24}>
          <ApprovalStatusCard
            bank="Public Bank"
            approval={loan && loan.publicBankApproval}
            onAccept={() => handleAccept('publicBankApproval')}
            isLoanAccepted={isAccepted}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ApprovalStatusOverview;
