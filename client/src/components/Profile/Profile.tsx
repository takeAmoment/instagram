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
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Image } from 'antd';
import React, { FC, useState } from 'react';
import styles from './Profile.module.scss';
import { EditForm, ProfileProps } from 'types/types';
import { useLocation } from 'react-router-dom';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { RcFile } from 'antd/es/upload';
import { updateUserApi } from 'api';
const { Title, Paragraph, Text } = Typography;

const Profile: FC<ProfileProps> = ({ posts, user, follow, unfollow, refreshUser }) => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const updateUser = async (formData: FormData) => {
    try {
      const response = await updateUserApi(formData);
      if (refreshUser) {
        refreshUser(response.data);
      }
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (values: EditForm) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('info', values.info);
    if (values.files && values.files.length > 0) {
      formData.append('file', values.files[0].originFileObj as RcFile);
    }
    updateUser(formData);
  };
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
                <Col style={{ position: 'relative' }}>
                  <Image
                    preview={false}
                    width={150}
                    style={{ borderRadius: '50%' }}
                    src={!user || !user.avatar ? '/assets/profile.png' : `/uploads/${user.avatar}`}
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
                  <Paragraph>{user?.info}</Paragraph>
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
                    <Tooltip placement="bottom" title="Edit photo">
                      <EditOutlined
                        style={{
                          fontSize: '18px',
                          position: 'absolute',
                          bottom: '0px',
                          right: '0px',
                          cursor: 'pointer',
                        }}
                        onClick={showModal}
                      />
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
            <Form.Item name="info">
              <TextArea />
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
      </div>
    </Content>
  );
};

export default Profile;
