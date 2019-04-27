import { Col, Layout, Row, Spin, PageHeader } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
const LoanForm = React.lazy(() => import('./containers/loan-form'));
const BankApprovalForm = React.lazy(() =>
  import('./containers/bank-approval-form')
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
