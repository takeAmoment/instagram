import { Row, Col, Divider, Typography, Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Image } from 'antd';
import React, { FC } from 'react';
import styles from './Profile.module.scss';
import { ProfileProps } from 'types/types';
import { useLocation } from 'react-router-dom';
const { Title, Paragraph, Text } = Typography;

const Profile: FC<ProfileProps> = ({ posts, user, follow, unfollow }) => {
  const location = useLocation();
  const userId = localStorage.getItem('userId');
  return (
    <Content>
      <div className={styles.container}>
        <section className={styles.profile}>
          <Row justify="center" align="middle" gutter={{ xs: 8, sm: 16 }}>
            <Col
              xs={{ span: 22 }}
              sm={{ span: 22 }}
              md={{ span: 6 }}
              lg={{ span: 4 }}
              className="gutter-row"
            >
              <Row justify="center">
                <Col>
                  <Image
                    width={150}
                    style={{ borderRadius: '50%' }}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 16 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Row justify="center">
                <Col>
                  <Title level={3}>{user?.name}</Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={6}>
                  <Text strong>{posts.length} posts</Text>
                </Col>
                <Col span={6}>
                  <Text strong>{user?.followers.length} followers</Text>
                </Col>
                <Col span={6}>
                  <Text strong>{user?.following.length} following</Text>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Paragraph>lorem lorem lorem</Paragraph>
                </Col>
              </Row>
              {location.pathname !== '/profile' && (
                <Row justify="center">
                  <Col>
                    {userId && user?.followers.includes(userId) ? (
                      <Button onClick={unfollow}>Unfollow</Button>
                    ) : (
                      <Button onClick={follow}>Follow</Button>
                    )}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </section>
        <Divider />
        <section className={styles.gallery}>
          <Row justify="center" gutter={[8, 8]}>
            {posts.length > 0 &&
              posts.map((post) => {
                return (
                  <Col
                    xs={{ span: 20 }}
                    sm={{ span: 20 }}
                    md={{ span: 8 }}
                    lg={{ span: 6 }}
                    key={post._id}
                  >
                    <Row justify="center">
                      <Col>
                        <Image src={`/uploads/${post.photo}`} />
                      </Col>
                    </Row>
                  </Col>
                );
              })}
          </Row>
        </section>
      </div>
    </Content>
  );
};

export default Profile;
