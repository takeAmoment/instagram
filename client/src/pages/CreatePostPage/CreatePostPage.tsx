import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Content } from 'antd/es/layout/layout';
import Upload, { RcFile } from 'antd/es/upload';
import { createPostApi } from '../../api/index';
import React from 'react';
import styles from './CreatePostPage.module.scss';
import { CreatePostInfo } from 'types/types';

const CreatePostPage = () => {
  const [form] = Form.useForm();
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleFinish = (values: CreatePostInfo) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('body', values.body);
    formData.append('file', values.files[0].originFileObj as RcFile);
    createPostApi(formData).then((response) => console.log(response));
    form.resetFields();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Content>
      <div className={styles.container}>
        <Form
          name="createPost"
          wrapperCol={{ span: 24 }}
          className={styles.form}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item name="title" rules={[{ required: true, message: 'Please enter your title' }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            name="body"
            rules={[{ required: true, message: 'Please enter your description' }]}
          >
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="files"
            valuePropName="fileList"
            getValueFromEvent={getFile}
            rules={[{ required: true, message: 'Please choose a photo' }]}
          >
            <Upload
              name="photos"
              maxCount={1}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
            >
              {uploadButton}
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" className={styles.submit__button}>
            Create
          </Button>
        </Form>
      </div>
    </Content>
  );
};

export default CreatePostPage;
