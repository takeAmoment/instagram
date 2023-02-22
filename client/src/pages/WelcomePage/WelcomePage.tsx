import { Content } from 'antd/es/layout/layout';
import { Button, Col, Row, Typography, Image } from 'antd';

const { Title, Paragraph } = Typography;
import React from 'react';
import styles from './WelcomePage.module.scss';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <Content className={styles.welcome}>
      <div className={styles.welcome__contant}>
        <Row justify="center" gutter={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 20 }}
            lg={{ span: 12 }}
            className={styles.contant__image}
          >
            <Image src="/assets/main-photo.jpg" preview={false} />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 20 }}
            lg={{ span: 12 }}
            className={styles.contant__info}
          >
            <Title className={styles.contant__title}>Welcome to Instagram</Title>
            <Paragraph className={styles.contant__text}>
              Hello a new friend. We are really glad to see you. With us you can keep in touch with
              your friend, share your photos, be inspired by new ideas, see how beautiful the word
              is, explore new places and learning. Sign up and enjoy our app.
            </Paragraph>
            <div className={styles.contant__buttons}>
              <Link to="/login">
                <Button type="primary" ghost size="large">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button type="primary" size="large">
                  Sign up
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default WelcomePage;
