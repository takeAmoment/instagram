import {
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Tooltip,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
  Form,
  Input,
  Empty,
  Spin,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Image } from 'antd';
import React, { FC, useState } from 'react';
import styles from './Profile.module.scss';
import { EditForm, ProfileProps, UsersPost } from 'types/types';
import { useLocation } from 'react-router-dom';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import { updateUser } from 'features/auth.slice';
import Post from 'components/Post/Post';
import { setCurrentPost } from 'features/post.slice';
const { Title, Paragraph, Text } = Typography;

const Profile: FC<ProfileProps> = ({ posts, user, follow, unfollow }) => {
  const dispatch = useAppDispath();
  const { currentPost, status } = useAppSelector((state) => state.post);
  const location = useLocation();
  const [form] = Form.useForm();
  const userId = localStorage.getItem('userId');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleUploadPhoto: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(['fields']);
  };
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);

  const showPostModal = (post: UsersPost) => {
    dispatch(setCurrentPost(post));
    setIsPostModalOpen(true);
  };

  const handlePostOk = () => {
    setIsPostModalOpen(false);
  };

  const handlePostCancel = () => {
    setIsPostModalOpen(false);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = (values: EditForm) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('info', values.info);
    if (values.files && values.files.length > 0) {
      formData.append('file', values.files[0].originFileObj as RcFile);
    }
    dispatch(updateUser(formData));
    handleCancel();
  };
  return (
    <Content>
      <div className={styles.container}>
        {status === 'loading' ? (
          <div className={styles.spin__container}>
            <Spin size="large" />
          </div>
        ) : (
          <>
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
                        preview={false}
                        width={150}
                        style={{ borderRadius: '50%' }}
                        src={
                          !user || !user.avatar ? '/assets/profile.png' : `/uploads/${user.avatar}`
                        }
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
                  <Row justify="center" style={{ marginBottom: '10px' }}>
                    <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <Row justify="center">
                        <Col>
                          <Text strong>{posts.length} posts</Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <Row justify="center">
                        <Col>
                          <Text strong>{user?.followers.length} followers</Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={{ span: 8 }} sm={{ span: 8 }} md={{ span: 6 }} lg={{ span: 6 }}>
                      <Row justify="center">
                        <Col>
                          <Text strong>{user?.following.length} following</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row justify="center">
                    <Col>
                      <Paragraph style={{ textAlign: 'center' }}>{user?.info}</Paragraph>
                    </Col>
                  </Row>
                  {location.pathname !== '/profile' ? (
                    <Row justify="center">
                      <Col>
                        {userId && user?.followers.includes(userId) ? (
                          <Button onClick={unfollow}>Unfollow</Button>
                        ) : (
                          <Button onClick={follow}>Follow</Button>
                        )}
                      </Col>
                    </Row>
                  ) : (
                    <Row justify="center">
                      <Col>
                        <Tooltip placement="bottom" title="Edit profile">
                          <EditOutlined onClick={showModal} style={{ fontSize: '24px' }} />
                        </Tooltip>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </section>
            <Divider />
            <section className={styles.gallery}>
              <Row justify="center" gutter={[8, 8]}>
                {posts.length === 0 && <Empty description="No posts yet" />}
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
                            <Image
                              src={`/uploads/${post.photo}`}
                              preview={false}
                              style={{ minHeight: '200px', cursor: 'pointer' }}
                              onClick={() => showPostModal(post)}
                            />
                          </Col>
                        </Row>
                      </Col>
                    );
                  })}
              </Row>
            </section>
          </>
        )}
        <Modal
          destroyOnClose={true}
          title="Edit profile"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" htmlType="submit" type="primary" form="editForm">
              Submit
            </Button>,
          ]}
        >
          <Form
            name="editForm"
            autoComplete="off"
            form={form}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            initialValues={{
              name: user?.name,
              email: user?.email,
              info: user?.info,
            }}
          >
            <Form.Item name="name">
              <Input />
            </Form.Item>
            <Form.Item name="email">
              <Input />
            </Form.Item>
            <Form.Item name="info" extra="Maximum 120 characters">
              <TextArea maxLength={120} rows={4} />
            </Form.Item>
            <Form.Item name="files" valuePropName="fileList" getValueFromEvent={getFile}>
              <Upload
                accept=".png,.jpeg,.jpg"
                name="files"
                maxCount={1}
                action="https://localhost:3000"
                defaultFileList={[...fileList]}
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadPhoto}
                beforeUpload={() => {
                  return false;
                }}
              >
                {fileList.length < 1 && uploadButton}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          open={isPostModalOpen}
          onOk={handlePostOk}
          bodyStyle={{ maxHeight: '400px', overflowY: 'scroll' }}
          className={styles.modal__post}
          onCancel={handlePostCancel}
          footer={false}
        >
          {currentPost && <Post post={currentPost} isModalPost={true} />}
          {!currentPost && <Text type="success">Your post was deleted!!!</Text>}
        </Modal>
      </div>
    </Content>
  );
};

export default Profile;
