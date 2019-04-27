import { Col, Layout, PageHeader, Row, Spin } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
const LoanForm = React.lazy(() =>
  import(/* webpackChunkName: "LoanForm" */ './containers/loan-form')
);
const BankApprovalForm = React.lazy(() =>
  import(
    /* webpackChunkName: "BankApprovalForm" */ './containers/bank-approval-form'
  )
);
const ApprovalStatusOverview = React.lazy(() =>
  import(
    /* webpackChunkName: "ApprovalStatusOverview" */ './containers/approval-status-overview'
  )
);

function App() {
  return (
    <BrowserRouter>
      <div>
        <PageHeader
          title="Smart Loan"
          subTitle="The only loan you need"
          backIcon={false}
        />
        <main>
          <Layout>
            <Layout.Content>
              <Row>
                <Col span={20} offset={2}>
                  <React.Suspense fallback={<Spin />}>
                    <Switch>
                      <Route
                        path="/loan-approval/:bank"
                        render={({ match }) => (
                          <BankApprovalForm bank={match.params.bank} />
                        )}
                      />
                      <Route
                        path="/loan-status/:applicationId"
                        render={({ match }) => (
                          <ApprovalStatusOverview
                            applicationId={match.params.applicationId}
                          />
                        )}
                      />
                      <Route exact path="/" render={() => <LoanForm />} />
                    </Switch>
                  </React.Suspense>
                </Col>
              </Row>
            </Layout.Content>
          </Layout>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default hot(App);
