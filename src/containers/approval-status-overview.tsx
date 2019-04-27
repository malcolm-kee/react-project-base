import { Button, Card, Col, Icon, Row, Statistic, Tag } from 'antd';
import * as React from 'react';
import { LoanApplication, LoanApproval } from '../constants/type';
import { isNil } from '../lib/fn';
import { formDb } from '../services/db';

const getApprovalStatusText = (approval: LoanApproval) =>
  isNil(approval.approved)
    ? 'Pending Review'
    : approval.approved
    ? 'Approved'
    : 'Rejected';

const getApprovalStatusColor = (approval: LoanApproval) =>
  isNil(approval.approved) ? undefined : approval.approved ? '#87d068' : 'red';

const isApproved = (approval: LoanApproval) => !!approval.approved;

const ApprovalStatusCard: React.FC<{
  bank: string;
  approval: LoanApproval;
  onAccept: () => void;
  isLoanAccepted: boolean;
}> = ({ bank, approval, onAccept, isLoanAccepted }) => {
  const isLoanApproved = isApproved(approval);
  const isAccepted = !!approval.acceptedByCustomer;

  return (
    <Card
      title={bank}
      extra={
        isLoanAccepted ? (
          isAccepted ? (
            <Tag color="#87d068">Accepted</Tag>
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
              ) : isNil(approval.approved) ? (
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
      <Row gutter={8}>
        <Col sm={12} xs={24}>
          <Statistic
            title="Approved Amount"
            value={isLoanApproved ? approval.approvedLoanAmount : 'N/A'}
            prefix={isLoanApproved ? 'RM' : undefined}
          />
        </Col>
        <Col sm={12} xs={24}>
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
      </Row>
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
    formDb.child(applicationId).update({
      [`${approvalKey}/acceptedByCustomer`]: true
    });
  }

  React.useEffect(() => {
    formDb.child(applicationId).on('value', snapshot => {
      if (snapshot) {
        setLoan(snapshot.val());
      } else {
        console.log('no snapshot');
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
      <h2>Approval Overview</h2>
      {loan && (
        <Row gutter={8}>
          <Col lg={8} md={12} xs={24}>
            <ApprovalStatusCard
              bank="Hong Leong Bank"
              approval={loan.hongLeongBankApproval}
              onAccept={() => handleAccept('hongLeongBankApproval')}
              isLoanAccepted={isAccepted}
            />
          </Col>
          <Col lg={8} md={12} xs={24}>
            <ApprovalStatusCard
              bank="CIMB Bank"
              approval={loan.cimbBankApproval}
              onAccept={() => handleAccept('cimbBankApproval')}
              isLoanAccepted={isAccepted}
            />
          </Col>
          <Col lg={8} md={12} xs={24}>
            <ApprovalStatusCard
              bank="Maybank"
              approval={loan.mayBankApproval}
              onAccept={() => handleAccept('mayBankApproval')}
              isLoanAccepted={isAccepted}
            />
          </Col>
          <Col lg={8} md={12} xs={24}>
            <ApprovalStatusCard
              bank="Public Bank"
              approval={loan.publicBankApproval}
              onAccept={() => handleAccept('publicBankApproval')}
              isLoanAccepted={isAccepted}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ApprovalStatusOverview;
