/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { createSearchParams } from 'react-router-dom';
import whereIcon from '../.././assert/where.png';
import whenIcon from '../.././assert/when.png';
import dayjs from 'dayjs';
import { EventInfo } from '@/typechain-types/contracts/Admin';
import { getMeta, renderNftImg } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

const TickenCard: FC<{ item: EventInfo.AllInfoStructOutput }> = ({ item }) => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [meta, setMeta] = useState<any>({});

  const params = {
    tid: item.basic.contractAddress,
    mode: 'detail',
    cid: address
  };

  const handleClick = () => {
    navigate({
      pathname: '/detail',
      search: `?${createSearchParams(params)}`
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const run = async () => {
      const meta = await getMeta(item.basic.metaURL);
      setMeta(meta);
    };
    run();
  }, [item.basic.metaURL]);
  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.header}>
        <div
          className={styles.img}
          style={{ backgroundImage: `url(${renderNftImg(meta?.image || '')})` }}></div>
        <div className={styles.content}>
          <div className={styles.title}>{item.basic.name}</div>
          <div className={styles.arrow}>{'>'}</div>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.where}>
          <img className={styles.icon} src={whereIcon} alt="whereicon" />
          <div className={styles.title}>Location</div>
          <div className={styles.text}>{meta.location}</div>
        </div>
        <div className={styles.when}>
          <img className={styles.icon} src={whenIcon} alt="whenicon" />
          <div className={styles.title}>Time</div>
          <div className={styles.text}>
            {dayjs.unix(Number(item.basic.holdTime)).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TickenCard;
