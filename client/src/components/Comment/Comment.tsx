import { DeleteOutlined } from '@ant-design/icons';
import { Space, Image, Typography } from 'antd';
import React, { FC } from 'react';
import { CommentProps } from 'types/types';
import styles from './Comment.module.scss';
const { Text, Paragraph } = Typography;

const Comment: FC<CommentProps> = ({ comment, handleDeleteComment }) => {
  const id = localStorage.getItem('userId');
  const rows = 2;
  return (
    <div key={comment._id} className={styles.comment}>
      <div className={styles.comment__text}>
        <Space size={5} align="start">
          <Image
            preview={false}
            width={25}
            style={{ borderRadius: '50%' }}
            src={
              comment.postedBy.avatar
                ? `/uploads/${comment.postedBy.avatar}`
                : `/assets/profile.png`
            }
          />
          <Text strong>{comment.postedBy.name && comment.postedBy.name}</Text>
        </Space>
        <Paragraph
          ellipsis={{
            rows,
            expandable: true,
            symbol: 'more',
          }}
          style={{ padding: '0px', margin: '0px' }}
        >
          {comment.text}
        </Paragraph>
      </div>
      {comment.postedBy._id === id && (
        <DeleteOutlined onClick={() => handleDeleteComment(comment)} />
      )}
    </div>
  );
};

export default Comment;
