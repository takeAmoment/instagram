import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './LoginPage.module.scss';
const { Paragraph } = Typography;

const onFinish = (values: object) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: object) => {
  console.log('Failed:', errorInfo);
};

const LoginPage = () => {
  const location = useLocation();
  const [form] = Form.useForm();
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
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div className={styles.form__icon}>
                <LockOutlined
                  style={{
                    fontSize: '48px',
                    color: '#bae0ff',
                    border: '3px solid #bae0ff',
                    borderRadius: '50%',
                    padding: '10px',
                  }}
                />
              </div>
              {location.pathname === '/register' && (
                <Form.Item
                  label="Username"
                  name="username"
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
