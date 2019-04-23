import { Button, DatePicker, Form, Input, Layout } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';

function App() {
  const [name, setName] = React.useState('');

  return (
    <main>
      <Layout>
        <Form title="Simple Form" layout="vertical">
          <Form.Item label="Name" required>
            <Input value={name} onChange={ev => setName(ev.target.value)} />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Layout>
    </main>
  );
}

export default hot(App);
