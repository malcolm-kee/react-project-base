import { Button, Col, Divider, Form, Layout, message, Row, Select } from 'antd';
import { Formik } from 'formik';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Field } from './components/field';
import { Input, InputGroup } from './components/input';
import { TextField } from './components/text-field';
import { States } from './constants/lov';

const initialValues = {
  name: '',
  id: '',
  date: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  postalCode: '',
  city: '',
  state: '',
  mobileNumber: '',
  email: '',
  company: '',
  companyHrNumber: '',
  salary: '',
  loadAmount: '',
  tenure: '',
  icImage: '',
  licenseImage: '',
  salarySlipFor3MonthsImages: '',
  savingStatementsFor3MonthsImages: ''
};

function App() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => message.success(`This is the value: ${JSON.stringify(values, null, 2)}`)}
    >
      {({ handleSubmit, handleChange, values, setFieldValue }) => (
        <main>
          <Layout>
            <Layout.Content>
              <Row>
                <Col span={20} offset={2}>
                  <Form onSubmit={handleSubmit} layout="vertical" className="pad">
                    <h1>Car Loan Application</h1>
                    <h2>Personal Details</h2>
                    <TextField
                      label="Full Name"
                      value={values.name}
                      name="name"
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                    <TextField
                      label="NRIC/Passport"
                      value={values.id}
                      name="id"
                      placeholder="901010101010"
                      onChange={handleChange}
                      required
                    />
                    <Field label="Address" required>
                      <Input
                        value={values.addressLine1}
                        name="addressLine1"
                        placeholder="Line 1"
                        onChange={handleChange}
                        autoComplete="street-address"
                        required
                      />
                      <Input
                        value={values.addressLine2}
                        placeholder="Line 2"
                        name="addressLine2"
                        autoComplete="address-line1"
                        onChange={handleChange}
                      />
                      <Input
                        value={values.addressLine3}
                        placeholder="Line 3"
                        autoComplete="address-line2"
                        name="addressLine3"
                        onChange={handleChange}
                      />
                      <InputGroup compact>
                        <Input
                          value={values.postalCode}
                          style={{ width: '50%' }}
                          placeholder="Postal Code"
                          name="postalCode"
                          autoComplete="postal-code"
                          onChange={handleChange}
                        />
                        <Input
                          value={values.city}
                          style={{ width: '50%' }}
                          placeholder="City/Area"
                          name="city"
                          autoComplete="address-level2"
                          onChange={handleChange}
                        />
                      </InputGroup>
                      <Select
                        value={values.state}
                        onChange={val => setFieldValue('state', val)}
                        placeholder="State"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option.props.children as string)
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {States.map(state => (
                          <Select.Option value={state.value} key={state.value}>
                            {state.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Field>
                    <TextField
                      label="Contact Number"
                      value={values.mobileNumber}
                      onChange={handleChange}
                      name="mobileNumber"
                      placeholder="0123456789"
                      type="tel"
                      required
                    />
                    <TextField
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="me@me.com"
                    />
                    <Divider />
                    <h2>Employment Details</h2>
                    <TextField
                      label="Company Name"
                      value={values.company}
                      onChange={handleChange}
                      name="company"
                      autoComplete="organization"
                      placeholder="ABC Sdn Bhd"
                      required
                    />
                    <TextField
                      label="Company Contact Number"
                      value={values.companyHrNumber}
                      onChange={handleChange}
                      name="companyHrNumber"
                      placeholder="0322721010"
                      type="tel"
                      required
                    />
                    <TextField
                      label="Current Monthly Salary (in RM)"
                      value={values.salary}
                      onChange={handleChange}
                      name="salary"
                      type="number"
                      min="0"
                      step="100"
                      placeholder="3000"
                      required
                    />
                    <Divider />
                    <h2>Loan Details</h2>
                    <TextField
                      label="Loan Amount"
                      value={values.loadAmount}
                      onChange={handleChange}
                      name="loadAmount"
                      type="number"
                      min="0"
                      step="100"
                      placeholder="50000"
                      required
                    />
                    <TextField
                      label="Tenure (number of years)"
                      value={values.tenure}
                      onChange={handleChange}
                      name="tenure"
                      type="number"
                      min="1"
                      step="1"
                      required
                    />
                    {/* 
Image input: IC
Image input: Driving license
Image or PDF input: 3 months salary slip
Image or PDF input: 3 months saving accounts statement
                    */}
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Layout.Content>
          </Layout>
        </main>
      )}
    </Formik>
  );
}

export default hot(App);
