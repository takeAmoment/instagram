import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { loginUser, registerUser } from 'features/auth.slice';
import { useAppDispath } from 'hooks/hooks';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RegisterInfo } from 'types/types';
import styles from './LoginPage.module.scss';
const { Paragraph } = Typography;

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const [form] = Form.useForm();

  const onFinish = async (values: RegisterInfo) => {
    if (location.pathname === '/register') {
      await dispatch(registerUser(values));
    } else if (location.pathname === '/login') {
      await dispatch(loginUser(values));
      navigate('/', { replace: true });
    }
    form.resetFields();
  };
  return (
    <Content>
      <div className={styles.container}>
        <Row justify="center">
          <Col>
            <Form
              name="loginForm"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              className={styles.form}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className={styles.form__icon}>
                <LockOutlined className={styles.icon__lock} />
              </div>
              {location.pathname === '/register' && (
                <Form.Item
                  label="Username"
                  name="name"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
              )}
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input.Password />
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
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                {location.pathname === '/register' ? (
                  <Button type="primary" htmlType="submit">
                    Sign up
                  </Button>
                ) : (
                  <Button type="primary" ghost htmlType="submit">
                    Login
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default LoginPage;
