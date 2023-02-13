import { Content } from 'antd/es/layout/layout';
import { Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;
import React from 'react';
import styles from './WelcomePage.module.scss';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className={styles.wrapper}>
      <Content className={styles.welcome}>
        <div className={styles.welcome__contant}>
          <Title className={styles.contant__title}>Nice to meet you</Title>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore eius repudiandae minus
            maiores, delectus accusantium inventore error praesentium enim. In adipisci asperiores
            libero quam nihil voluptatem maiores ratione corrupti commodi! Repudiandae rem harum
            odit voluptate porro asperiores nisi consequatur laboriosam aliquam eligendi, voluptas
            numquam aperiam reiciendis natus dolor delectus nam nobis deserunt consequuntur, id,
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
        </div>
      </Content>
    </div>
  );
};

export default WelcomePage;
