import { Col, Layout, Row, Spin, PageHeader } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
const LoanForm = React.lazy(() => import('./containers/loan-form'));

function App() {
  return (
    <div>
      <PageHeader title="Smart Loan" subTitle="The only loan you need" backIcon={false} />
      <main>
        <Layout>
          <Layout.Content>
            <Row>
              <Col span={20} offset={2}>
                <React.Suspense fallback={<Spin />}>
                  <LoanForm />
                </React.Suspense>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
      </main>
    </div>
  );
}

export default hot(App);
