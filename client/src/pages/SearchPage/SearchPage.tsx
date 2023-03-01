import { Avatar, Input, List, notification, Image } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { PaginationAlign, PaginationPosition } from 'antd/es/pagination/Pagination';
import { findUserApi } from 'api';
import { isAxiosError } from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from 'types/types';
import styles from './SearchPage.module.scss';
const { Search } = Input;

const SearchPage = () => {
  const [users, setUsers] = useState<IUser[]>();
  const position: PaginationPosition = 'bottom';
  const align: PaginationAlign = 'center';
  const id = localStorage.getItem('userId');

  const onSearch = async (value: string) => {
    try {
      const response = await findUserApi(value);
      setUsers(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        notification.error({
          message: 'Error' + error.response?.status,
          description: error.response?.data.message,
        });
        throw new Error(error.message);
      }
    }
  };

  return (
    <Content>
      <div className={styles.container}>
        <div className={styles.input}>
          <Search placeholder="Enter name of user" onSearch={onSearch} />
        </div>
        {users ? (
          <List
            style={{ width: '100%' }}
            pagination={{ position, align }}
            dataSource={users}
            renderItem={(item) => (
              <Link to={id === item._id ? '/profile' : `/profile/${item._id}`}>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item.avatar ? `uploads/${item.avatar}` : '/assets/profile.png'}
                      />
                    }
                    title={item.name}
                    description={item.info}
                  />
                </List.Item>
              </Link>
            )}
          />
        ) : (
          <Image preview={false} src="/assets/search.jpg" width="30%" />
        )}
      </div>
    </Content>
  );
};

export default SearchPage;
