import { Button, Form, Select, Spin, Steps } from 'antd';
import { Formik } from 'formik';
import * as React from 'react';
import { Field } from '../components/field';
import { ImageUpload } from '../components/image-upload';
import { Input, InputGroup } from '../components/input';
import { TextField } from '../components/text-field';
import { Toolbar } from '../components/toolbar';
import { States } from '../constants/lov';
import { FormValues } from '../constants/type';

const Step = Steps.Step;

const getMessage = () =>
  import(/* webpackChunkName: "message" */ '../components/message');

const displaySuccessText = (text: string) =>
  getMessage().then(({ default: message }) => message.success(text));

function PersonalDetails({ values, handleChange, setFieldValue }: any) {
  return (
    <>
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
    </>
  );
}

function EmploymentDetails({ values, handleChange }: any) {
  return (
    <>
      <h2>Employment Details</h2>
      <TextField
        label="Company Name"
        value={values.company}
        onChange={handleChange}
        name="company"
        autoComplete="organization"
        placeholder="ABC Sdn Bhd"
        required
        autoFocus
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
    </>
  );
}

function LoanDetails({ values, handleChange }: any) {
  return (
    <>
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
        autoFocus
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
    </>
  );
}

function SupportingDocuments({ setFieldValue }: any) {
  return (
    <div>
      <h2>Supporting Documents</h2>
      <Field label="Photocopy of ID (IC / Passport)">
        <ImageUpload
          max={1}
          onFileChange={filePaths =>
            setFieldValue('icImage', filePaths[0] || '')
          }
        />
      </Field>
      <Field label="Photocopy of driving license">
        <ImageUpload
          max={1}
          onFileChange={filePaths =>
            setFieldValue('licenseImage', filePaths[0] || '')
          }
        />
      </Field>
      <Field label="Pay slip (for last 3 months)">
        <ImageUpload
          max={3}
          onFileChange={filePaths =>
            setFieldValue('salarySlipFor3MonthsImages', filePaths)
          }
        />
      </Field>
      <Field label="Saving account statements (for last 3 months)">
        <ImageUpload
          max={3}
          onFileChange={filePaths =>
            setFieldValue('savingStatementsFor3MonthsImages', filePaths)
          }
        />
      </Field>
    </div>
  );
}

const initialValues: FormValues = {
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
  salarySlipFor3MonthsImages: [],
  savingStatementsFor3MonthsImages: []
};

function useStepper(initialStep = 0) {
  const [step, setStep] = React.useState(initialStep);
  function next() {
    setStep(stepNow => stepNow + 1);
  }
  function prev() {
    setStep(stepNow => stepNow - 1);
  }
  return {
    step,
    next,
    prev
  };
}

function LoanForm() {
  const { step, next, prev } = useStepper();

  return (
    <div>
      <h1>Car Loan Application</h1>
      <Toolbar>
        <Steps current={step}>
          <Step title="Personal" />
          <Step title="Employment" />
          <Step title="Loan" />
          <Step title="Supporting Documents" />
          <Step title="Result" />
        </Steps>
      </Toolbar>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          if (step === 4) {
            displaySuccessText(
              `This is the value: ${JSON.stringify(values, null, 2)}`
            );
          } else {
            next();
          }
        }}
      >
        {({ handleSubmit, handleChange, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit} layout="vertical" className="pad">
            {step === 0 && (
              <PersonalDetails
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            )}
            {step === 1 && (
              <EmploymentDetails values={values} handleChange={handleChange} />
            )}
            {step === 2 && (
              <LoanDetails values={values} handleChange={handleChange} />
            )}
            {step === 3 && (
              <SupportingDocuments setFieldValue={setFieldValue} />
            )}
            {step === 4 && (
              <div>
                <h2>Application Result</h2>
                <p>
                  Coming soon <Spin />
                </p>
              </div>
            )}
            <Toolbar justifyContent="space-between" flexFlow="row-reverse">
              <Button type="primary" htmlType="submit">
                {step === 4 ? 'Submit' : 'Next'}
              </Button>
              {step > 0 && (
                <Button onClick={prev} htmlType="button">
                  Previous
                </Button>
              )}
            </Toolbar>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoanForm;
