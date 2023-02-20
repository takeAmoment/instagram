import { HeartOutlined } from '@ant-design/icons';
import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Card, Input, Space, Typography } from 'antd';
import { likePost, unlikePost } from 'features/post.slice';
import { useAppDispath } from 'hooks/hooks';
import React, { FC } from 'react';
import { PostProps } from 'types/types';
const { Title, Paragraph } = Typography;
const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const Post: FC<PostProps> = ({ post }) => {
  const id = localStorage.getItem('userId');
  const dispatch = useAppDispath();
  const handleClick = async () => {
    const id = localStorage.getItem('userId');
    if (id && !post.likes.includes(id)) {
      const postId = post._id;
      dispatch(likePost({ postId: postId }));
    }
  };

  const handleUnlike = () => {
    const id = localStorage.getItem('userId');
    if (id && post.likes.includes(id)) {
      const postId = post._id;
      dispatch(unlikePost({ postId: postId }));
    }
  };
  const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={HeartSvg} {...props} onClick={handleUnlike} />
  );

  return (
    <Card style={{ width: 600 }} cover={<img alt="example" src={`./uploads/${post.photo}`} />}>
      <Space size={10} align="center">
        {!post.likes.includes(id!) ? (
          <HeartOutlined style={{ fontSize: '28px' }} onClick={handleClick} />
        ) : (
          <HeartIcon style={{ color: 'red', fontSize: '28px' }} />
        )}
        <Paragraph strong style={{ margin: 0, padding: 0 }}>
          {post.likes.length}
        </Paragraph>
      </Space>
      <Title level={5}>{post.title}</Title>
      <Paragraph>{post.body}</Paragraph>
      <Input
        bordered={false}
        placeholder="Your comment"
        style={{ boxShadow: '0px 2px 1px -1px grey' }}
      />
    </Card>
  );
};

export default Post;
