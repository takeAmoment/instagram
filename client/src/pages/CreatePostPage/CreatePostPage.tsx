import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Content } from 'antd/es/layout/layout';
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';
import styles from './CreatePostPage.module.scss';
import { CreatePostInfo } from 'types/types';
import { useAppDispath, useAppSelector } from 'hooks/hooks';
import { createPost } from 'features/post.slice';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const { isCreated } = useAppSelector((state) => state.post);
  const dispatch = useAppDispath();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  useEffect(() => {
    if (isCreated) {
      navigate('/');
    }
  }, [isCreated, navigate]);

  const handleUploadPhoto: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleFinish = (values: CreatePostInfo) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('body', values.body);
    formData.append('file', values.files[0].originFileObj as RcFile);
    dispatch(createPost(formData));
    form.resetFields();
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Content>
      <div className={styles.container}>
        <Form
          form={form}
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
              accept=".png,.jpeg,.jpg"
              name="photos"
              maxCount={1}
              onChange={handleUploadPhoto}
              action="https://localhost:3000"
              onPreview={handlePreview}
              listType="picture-card"
              beforeUpload={() => {
                return false;
              }}
            >
              {fileList.length === 0 && uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ span: 12 }}>
            <Button type="primary" htmlType="submit" className={styles.submit__button}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Content>
  );
};

export default CreatePostPage;
