import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { loginUser, registerUser } from 'features/auth.slice';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RegisterInfo } from 'types/types';
import styles from './LoginPage.module.scss';
const { Paragraph } = Typography;

const LoginPage = () => {
  const { isRegistered, userData } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const [form] = Form.useForm();

  useEffect(() => {
    if (isRegistered) {
      navigate('/login', { replace: true });
    }
  }, [isRegistered, navigate]);

  useEffect(() => {
    if (userData.token) {
      navigate('/', { replace: true });
    }
  }, [userData, navigate]);

  const onFinish = async (values: RegisterInfo) => {
    if (location.pathname === '/register') {
      dispatch(registerUser(values)).then();
    } else if (location.pathname === '/login') {
      dispatch(loginUser(values));
    }
    form.resetFields();
  };
  return (
    <Content>
      <div className={styles.container}>
        <Row justify="center">
          <Col className={styles.column}>
            <Form
              name="loginForm"
              form={form}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              className={styles.form}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className={styles.form__icon}>
                <img src="./assets/protection.png" alt="protection" />
              </div>
              {location.pathname === '/register' && (
                <Form.Item
                  label="Username"
                  name="name"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    { min: 3, message: 'Minimum length 3' },
                  ]}
                >
                  <Input style={{ fontSize: '16px' }} />
                </Form.Item>
              )}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email' },
                  {
                    pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
                    message: 'Please put correct email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                  {
                    min: 6,
                    message: 'Minimum 6 characters',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
                {location.pathname === '/register' ? (
                  <Button type="primary" htmlType="submit" size="large">
                    Sign up
                  </Button>
                ) : (
                  <Button type="primary" ghost htmlType="submit" size="large">
                    Login
                  </Button>
                )}
              </Form.Item>
              {location.pathname === '/register' ? (
                <Link to="/login">
                  <Paragraph className={styles.form__message}>Are you already sign up?</Paragraph>
                </Link>
              ) : (
                <Link to="/register">
                  <Paragraph className={styles.form__message}>Are you not register yet?</Paragraph>
                </Link>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default LoginPage;
