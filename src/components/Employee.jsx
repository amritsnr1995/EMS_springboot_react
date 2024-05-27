import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed')
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
});

const Employee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        console.log('Fetched employee data:', response.data);
        setInitialValues(response.data);
      }).catch((error) => {
        console.error('Error fetching employee data:', error);
      });
    }
  }, [id]);

  const pageTitle = (id) => {
    return id ? <h2>Update Employee</h2> : <h2>Add Employee</h2>;
  };

  const onSubmit = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    console.log('Employee ID:', id);

    if (id) {
      // Update employee
      updateEmployee(id, values).then((response) => {
        console.log('Updated employee data:', response.data);
        setSubmitting(false);
        navigate('/employees');
      }).catch((error) => {
        console.error('Error updating employee:', error);
        setSubmitting(false);
      });
    } else {
      // Create new employee
      createEmployee(values).then((response) => {
        console.log('Created employee data:', response.data);
        setSubmitting(false);
        navigate('/employees');
      }).catch((error) => {
        console.error('Error creating employee:', error);
        setSubmitting(false);
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="card">
          {pageTitle(id)}
        </div>
        <div className="card-body">
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="firstName">First Name:</label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Input first name here"
                    className="form-control"
                  />
                  <ErrorMessage name="firstName" component="div" className="text-danger" />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="lastName">Last Name:</label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Input last name here"
                    className="form-control"
                  />
                  <ErrorMessage name="lastName" component="div" className="text-danger" />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label" htmlFor="email">Email:</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Input email here"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="d-flex align-items-center">
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    Submit
                  </button>
                  {isSubmitting && (
                    <div className="spinner-border text-primary ml-3" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Employee;
