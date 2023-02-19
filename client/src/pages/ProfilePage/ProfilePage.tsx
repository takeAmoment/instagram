import { Col, Divider, Row, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React, { useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import { Image } from 'antd';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import { getUserPosts } from 'features/post.slice';
const { Title, Paragraph, Text } = Typography;

const ProfilePage = () => {
  const posts = useAppSelector((state) => state.post.usersPosts);
  const dispatch = useAppDispath();

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

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
                  <Title level={3}>First Name Second Name</Title>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={6}>
                  <Text strong>33 posts</Text>
                </Col>
                <Col span={6}>
                  <Text strong>23 followers</Text>
                </Col>
                <Col span={6}>
                  <Text strong>78 following</Text>
                </Col>
              </Row>
              <Row justify="center">
                <Col>
                  <Paragraph>lorem lorem lorem</Paragraph>
                </Col>
              </Row>
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
                        <Image src={`./uploads/${post.photo}`} />
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

export default ProfilePage;
