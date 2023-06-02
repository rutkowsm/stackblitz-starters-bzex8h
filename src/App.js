import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './style.css';
import pl from 'yup-locale-pl';

Yup.setLocale(pl);

const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Za krótkie!')
    .max(50, 'Za długie!')
    .required('Wymagane pole'),
  lastName: Yup.string()
    .min(2, 'Za krótkie!')
    .max(50, 'Za długie!')
    .required('Wymagane pole'),
  email: Yup.string()
    .email('Nieprawidłowy adres e-mail')
    .required('Wymagane pole'),
  phoneNumber: Yup.string()
    .matches(/^(\+\d{1,3})?\d{9,15}$/, 'Nieprawidłowy numer telefonu')
    .required('Wymagane pole'),
  birthDate: Yup.date()
    .min(new Date('1900-01-01'), 'Nieprawidłowa data')
    .max(new Date(), 'Nieprawidłowa data')
    .required('Wymagane pole'),
});

function App() {
  const [employees, setEmployees] = useState([]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setEmployees([...employees, values]);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Dodaj pracownika</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          birthDate: '',
        }}
        validationSchema={EmployeeSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="firstName">Imię:</label>
            <Field name="firstName" />
            <ErrorMessage name="firstName" component="div" className="error" />

            <label htmlFor="lastName">Nazwisko:</label>
            <Field name="lastName" />
            <ErrorMessage name="lastName" component="div" className="error" />

            <label htmlFor="email">E-mail:</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label htmlFor="phoneNumber">Telefon:</label>
            <Field name="phoneNumber" />
            <ErrorMessage
              name="phoneNumber"
              component="div"
              className="error"
            />

            <label htmlFor="birthDate">Data urodzenia:</label>
            <Field name="birthDate" type="date" />
            <ErrorMessage name="birthDate" component="div" className="error" />

            <button type="submit" disabled={isSubmitting}>
              Dodaj pracownika
            </button>
          </Form>
        )}
      </Formik>

      <div>
        <h2>Lista pracowników</h2>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>
              Imię i nazwisko: {employee.firstName} {employee.lastName}; Adres
              e-mail: {employee.email}; Telefon: {employee.phoneNumber}; Data
              urodzenia: {employee.birthDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
