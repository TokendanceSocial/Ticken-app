/* eslint-disable react-hooks/exhaustive-deps */
import { useEventList } from '@/abihooks';
import { Toast } from 'antd-mobile';
import React, { useEffect, useRef } from 'react';

import InviteAvatar from '../../assert/invite_avatar.png';
import Avatar from '../../assert/invite-avatar.png';
import styles from './inde.module.scss';
import { useAccount } from 'wagmi';
import { handleAddress } from '@/utils';
import TickenCard from '@/components/tickenCard';
import { ToastHandler } from 'antd-mobile/es/components/toast';
const List: React.FC = () => {
  const { data: list = [], run } = useEventList();
  const { address = '' } = useAccount();
  const handler = useRef<ToastHandler>();
  useEffect(() => {
    handler.current = Toast.show({
      icon: 'loading',
      content: 'Loading…'
    });
    run().finally(() => {
      handler.current?.close();
    });
  }, []);

  const copyData = async () => {
    try {
      await navigator.clipboard.writeText(address);
      Toast.show({
        icon: 'success',
        content: '复制成功!'
      });
    } catch (err) {
      Toast.show({
        icon: 'fail',
        content: '复制失败!'
      });
    }
  };
  console.log('List', list);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={InviteAvatar} alt="" />
          <img src={Avatar} alt="" />
        </div>
        <div onClick={copyData} className={styles.address}>
          {handleAddress(address || '')}
        </div>
      </div>
      <div className={styles.content}>
        {list && list.map((item, index) => <TickenCard item={item} key={index} />)}
      </div>
    </div>
  );
};
export default List;
