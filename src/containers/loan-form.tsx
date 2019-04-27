import { Button, Form, List, Select, Steps, Icon } from 'antd';
import { Formik } from 'formik';
import * as React from 'react';
import { Field } from '../components/field';
import { ImageUpload } from '../components/image-upload';
import { Input, InputGroup } from '../components/input';
import { TextField } from '../components/text-field';
import { Toolbar } from '../components/toolbar';
import { States } from '../constants/lov';
import { FormValues } from '../constants/type';
import { createNumberArray } from '../lib/fn';
import { saveForm } from '../services/form-service';

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
            required
          />
          <Input
            value={values.city}
            style={{ width: '50%' }}
            placeholder="City/Area"
            name="city"
            autoComplete="address-level2"
            onChange={handleChange}
            required
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
        addonBefore="RM"
        min="0"
        step="100"
        placeholder="3000"
        required
      />
    </>
  );
}

function LoanDetails({
  values,
  handleChange,
  setFieldValue
}: {
  values: FormValues;
  handleChange: any;
  setFieldValue: any;
}) {
  return (
    <>
      <h2>Loan Details</h2>
      <TextField
        label="Car Price"
        value={values.carPrice}
        onChange={handleChange}
        name="carPrice"
        type="number"
        min="0"
        step="1"
        placeholder="50000"
        addonBefore="RM"
        required
        autoFocus={!values.carPrice}
      />
      <TextField
        label="Downpayment (min 10 % of car price)"
        value={values.downPayment}
        onChange={handleChange}
        name="downPayment"
        type="number"
        min="0"
        step="1"
        placeholder="5000"
        addonBefore="RM"
        required
      />
      <Field label="Tenure (number of years)" required>
        <Select
          value={values.tenure}
          onChange={val => setFieldValue('tenure', val)}
          id="tenure"
        >
          {createNumberArray(9, 1).map(numOfYear => (
            <Select.Option value={numOfYear}>{numOfYear}</Select.Option>
          ))}
        </Select>
      </Field>
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

const Item = List.Item;

const imgStyles: React.CSSProperties = {
  maxWidth: '80vw',
  display: 'block'
};

const Summary: React.FC<{ values: FormValues }> = ({ values }) => (
  <div>
    <List renderItem={() => null}>
      <Item>Name: {values.name}</Item>
      <Item>NRIC/Passport: {values.id}</Item>
      <Item>
        Addresses: {values.addressLine1}
        <br />
        {values.addressLine2}
        <br />
        {values.addressLine3}
        <br />
        {values.postalCode}, {values.city}, {values.state}
      </Item>
      <Item>Mobile: {values.mobileNumber}</Item>
      <Item>Email: {values.email || 'Not Provided'}</Item>
      <Item>
        Company: {values.company} ({values.companyHrNumber})
      </Item>
      <Item>Salary: {values.salary}</Item>
      <Item>Car Price: RM {values.carPrice}</Item>
      <Item>Down Payment: RM {values.downPayment}</Item>
      <Item>Tenure: {values.tenure} year(s)</Item>
      <Item>
        IC: <img src={values.icImage} style={imgStyles} />
      </Item>
      <Item>
        License: <img src={values.licenseImage} style={imgStyles} />
      </Item>
      <Item>
        Salary Slips: <br />
        {values.salarySlipFor3MonthsImages.map((imgSrc, index) => (
          <img src={imgSrc} key={index} style={imgStyles} />
        ))}
      </Item>
      <Item>
        Saving statements: <br />
        {values.savingStatementsFor3MonthsImages.map((imgSrc, index) => (
          <img src={imgSrc} key={index} style={imgStyles} />
        ))}
      </Item>
    </List>
  </div>
);

const initialValues: FormValues = {
  name: '',
  id: '',
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
  carPrice: '',
  downPayment: '',
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
          <Step title="Summary" />
          <Step title="Complete" />
        </Steps>
      </Toolbar>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          if (step === 4) {
            saveForm(values)
              .then(() => {
                displaySuccessText('Form submitted');
                next();
                actions.setSubmitting(false);
              })
              .catch(() => actions.setSubmitting(false));
          } else {
            next();
            actions.setSubmitting(false);
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          setFieldValue,
          isSubmitting
        }) => (
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
              <LoanDetails
                values={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            )}
            {step === 3 && (
              <SupportingDocuments setFieldValue={setFieldValue} />
            )}
            {step === 4 && <Summary values={values} />}
            {step === 5 && (
              <div>
                <h2>Submitted!</h2>
                <Icon
                  type="check-circle"
                  style={{ color: 'green', fontSize: '3rem' }}
                />
                <p>Wait for our good news!</p>
              </div>
            )}
            {step < 5 && (
              <Toolbar justifyContent="space-between" flexFlow="row-reverse">
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  {step === 4 ? 'Submit' : 'Next'}
                </Button>
                {step > 0 && (
                  <Button onClick={prev} htmlType="button">
                    Previous
                  </Button>
                )}
              </Toolbar>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoanForm;
