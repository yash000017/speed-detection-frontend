import React, { useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import './login.scss';
import CommonInput from '../../components/input/InputField';
import CommonButton from '../../components/button/Button';
import { notify } from '../../utils/toast';
import { AxiosError } from 'axios';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect them to the home page
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').max(100, 'Email cannot exceed 100 characters').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // Handle form submission
  const handleFormSubmit = async (values: LoginFormValues, { setErrors, setSubmitting }: any) => {
    try {
      const response = await axiosInstance.post('/login', values);
      
      if (response.data && response.data.status === "true") {
        notify("Login successful!", 'success');
        const { token } = response.data;

        localStorage.setItem('token', token);
  
        navigate('/home');
      } else {
        if (response.data.message) {
          if (response.data.message.includes("email")) {
            setErrors({ email: response.data.message }); 
          } else if (response.data.message.includes("password")) {
            setErrors({ password: response.data.message }); 
          }
        }
      }
    } catch (error) {
      if (error) {
        const err = error as AxiosError;
        const errData = err?.response?.data as {message: string};
        const message = errData?.message;
        if (message) {
          if (message.includes("email")) {
            notify(message, 'error');
            // setErrors({ email: message }); 
          } else if (message.includes("password")) {
            notify(message, 'error'); 
          }
        } else {
          setErrors({ general: 'An unexpected error occurred. Please try again later.' });
        }
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again later.' });
      }
    } finally {
      setSubmitting(false); // Ensure to set submitting to false in finally
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-overlay"></div>
      </div>
      <div className="login-right">
        <div className="login-content">
          <h2 className="login-title">Welcome Back 👋</h2>
          <p className="login-subtitle">Log in to your account below</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
              <Form aria-autocomplete='none' onSubmit={handleSubmit}>
                <div className='login-input-fields'>
                  <div className="input-group">
                    <CommonInput
                      placeholder='Enter your email'
                      name='email'
                      type='email'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.email && touched.email)}
                      // required={true}
                      className='login-input'
                    />
                    <ErrorMessage name='email' component='div' className='login-error' />
                  </div>

                  <div className="input-group">
                    <CommonInput
                      placeholder='Enter your password'
                      name='password'
                      type='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.password && touched.password)}
                      // required={true}
                      className='login-input'
                    />
                    <ErrorMessage name='password' component='div' className='login-error' />
                  </div>
                </div>

                <CommonButton 
                  type="submit" 
                  disabled={isSubmitting} 
                  fullWidth={true}
                  className="login-button"
                >
                  Login
                </CommonButton>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
