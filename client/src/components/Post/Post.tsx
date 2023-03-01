import { EllipsisOutlined, HeartOutlined } from '@ant-design/icons';
import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import {
  Card,
  Form,
  Input,
  Space,
  Typography,
  Button,
  Image,
  Dropdown,
  MenuProps,
  Row,
  Col,
  Modal,
  List,
} from 'antd';
import Comment from 'components/Comment/Comment';
import {
  addComment,
  changeAllPosts,
  changeFollowingPosts,
  changeUsersPosts,
  deleteCurrentPost,
  deletePost,
  deletePostFromAll,
  likePost,
  removeComment,
  unlikePost,
} from 'features/post.slice';
import { useAppDispath } from 'hooks/hooks';
import { HeartSvg } from 'icons/icons';
import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CommentInfo, PostProps, IComment } from 'types/types';
import styles from './Post.module.scss';
const { Title, Paragraph, Text } = Typography;

const Post: FC<PostProps> = ({ post, isModalPost }) => {
  const id = localStorage.getItem('userId');
  const location = useLocation();
  const dispatch = useAppDispath();
  const [form] = Form.useForm();
  const myPost = post.postedBy._id === id;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkLocation = () => {
    if (location.pathname === '/') {
      dispatch(changeAllPosts());
    } else if (location.pathname === '/profile') {
      dispatch(changeUsersPosts());
    } else if (location.pathname === '/followingposts') {
      dispatch(changeFollowingPosts());
    }
  };

  const handleClick = async () => {
    const id = localStorage.getItem('userId');
    if (id && !post.likes.includes(id)) {
      const postId = post._id;
      await dispatch(likePost({ postId: postId }));
      checkLocation();
    }
  };

  const handleUnlike = async () => {
    const id = localStorage.getItem('userId');
    if (id && post.likes.includes(id)) {
      const postId = post._id;
      await dispatch(unlikePost({ postId: postId }));
      checkLocation();
    }
  };

  const onFinish = async (value: CommentInfo) => {
    const postId = post._id;
    await dispatch(addComment({ text: value.text, postId: postId }));
    checkLocation();
    form.resetFields();
  };

  const handleDeleteComment = async (comment: IComment) => {
    await dispatch(removeComment({ _id: comment._id, postId: post._id }));
    checkLocation();
  };

  const checkPath = () => {
    if (location.pathname === '/') {
      dispatch(deletePostFromAll());
    } else if (location.pathname === '/profile') {
      dispatch(deleteCurrentPost());
    }
  };

  const handleDeletePost = async () => {
    await dispatch(deletePost(post._id));
    checkPath();
  };

  const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={HeartSvg} {...props} onClick={handleUnlike} />
  );

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button onClick={handleDeletePost} type="link">
          Delete
        </Button>
      ),
    },
  ];
  const rows = 2;

  return (
    <Card
      className={isModalPost ? styles.modal__card : styles.card}
      bodyStyle={{ padding: '24px 24px 10px 24px' }}
      cover={
        <>
          <div className={styles.card__cover}>
            <Link to={myPost ? '/profile' : `/profile/${post.postedBy._id}`}>
              <Space size={10}>
                <Image
                  preview={false}
                  width={40}
                  className={styles.cover__avatar}
                  src={
                    post.postedBy.avatar
                      ? `/uploads/${post.postedBy.avatar}`
                      : `/assets/profile.png`
                  }
                />
                <Title className={styles.cover__name} level={5}>
                  {post.postedBy.name}
                </Title>
              </Space>
            </Link>
            {myPost && (
              <Dropdown menu={{ items }} placement="bottom">
                <a onClick={(e) => e.preventDefault()}>
                  <EllipsisOutlined style={{ fontSize: '24px' }} />
                </a>
              </Dropdown>
            )}
          </div>
          <img alt="example" src={`/uploads/${post.photo}`} />
        </>
      }
    >
      <Space size={10} align="center">
        {!post.likes.includes(id!) ? (
          <HeartOutlined style={{ fontSize: '28px' }} onClick={handleClick} />
        ) : (
          <HeartIcon style={{ color: 'red', fontSize: '28px' }} />
        )}
        <Text strong>{post.likes.length}</Text>
      </Space>
      <Title level={5} style={{ marginTop: '10px' }}>
        {post.title}
      </Title>
      <Paragraph
        ellipsis={{
          rows,
          expandable: true,
          symbol: 'more',
        }}
      >
        {post.body}
      </Paragraph>
      <div>
        <Text type="secondary">Comments {post.comments.length}:</Text>
        {post.comments.length > 0 &&
          post.comments.slice(0, 1).map((comment) => {
            return (
              <Comment
                comment={comment}
                handleDeleteComment={handleDeleteComment}
                key={comment._id}
              />
            );
          })}
        {post.comments.length > 1 && (
          <Row justify="center">
            <Col>
              <Button type="link" onClick={showModal}>
                View all comments
              </Button>
            </Col>
          </Row>
        )}
      </div>
      <Form name="commentForm" onFinish={onFinish} autoComplete="off" form={form} key={1}>
        <Form.Item name="text">
          <Input
            bordered={false}
            placeholder="Leave your comment here ;)"
            style={{ boxShadow: '0px 2px 1px -1px grey', borderRadius: '0', marginTop: '10px' }}
          />
        </Form.Item>
      </Form>
      <Modal
        title="Comments:"
        open={isModalOpen}
        bodyStyle={{ maxHeight: '250px', overflowY: 'scroll' }}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {post.comments.length > 0 && (
          <List
            className={styles.comment__list}
            dataSource={post.comments}
            renderItem={(comment: IComment) => (
              <List.Item className={styles.comment__item}>
                <Comment comment={comment} handleDeleteComment={handleDeleteComment} />
              </List.Item>
            )}
          />
        )}
      </Modal>
    </Card>
  );
};

export default Post;
