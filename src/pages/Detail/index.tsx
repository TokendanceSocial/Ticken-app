/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import querystring from 'query-string';
import QRCode from 'qrcode.react';
import qrCode from '@/assert/qrcode.png';
import Where from '@/assert/where.png';
import When from '@/assert/when.png';
import styles from './index.module.scss';
import { useAccount } from 'wagmi';
import { useFetchEventDetail, useEventMint, useSign, useIsSign } from '@/abihooks';
import { getMeta, renderNftImg } from '@/utils';
import { Button, Dialog, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

const Detail: React.FC = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [metaData, setMetaData] = useState({});
  const [visible, setVisible] = useState(false);
  const { data, run } = useFetchEventDetail();
  const { run: mint } = useEventMint();
  const { run: sign } = useSign();
  const { data: isSigned = false, run: isSignRun } = useIsSign();
  const search = querystring.parse(window.location.href.split('?')[1]);
  const tid: string = (search?.tid as string) || '0x7eEC270e6ddAF482ada1453f501CB5CBE9A511Eb'; //票id
  const cid: string = (search?.cid as string) || '0x7eEC270e6ddAF482ada1453f501CB5CBE9A511Eb'; //分享人id
  const mode = (search?.mode as string) || 'detail'; // detail invite mint
  const genQrCode = () => {
    setVisible(true);
  };
  const _fissionMint = () => {
    mint({
      eventAddress: tid,
      address: cid,
      price: data?.basic?.price
    }).then(() => {
      Toast.show({
        icon: 'success',
        content: 'Join successfully, jump to the homepage after 3s'
      });
      setTimeout(() => {
        // 跳转首页
        navigate('/list');
      }, 3000);
    });
  };
  const Sign = () => {
    sign({
      eventAddress: tid,
      tokenId: data?.user?.tokenId
    }).then(() => {
      Toast.show({
        icon: 'success',
        content: 'Verification success'
      });
    });
  };
  const copyInvite = () => {
    const url =
      window.location.origin + window.location.pathname + `?mode=mint&tid=${tid}&cid=${address}`;
    Dialog.alert({
      content: <p style={{ padding: '10px', wordBreak: 'break-all' }}>{url}</p>,
      confirmText: 'close',
      onConfirm: () => {
        console.log('Confirmed');
      }
    });
  };
  useEffect(() => {
    // 查看对应用户的信息状态，我进来看我的，别人进来查看别人的
    run({
      eventAddress: tid,
      address: address
    });
    setInterval(() => {
      if (data?.user?.tokenId) {
        isSignRun({
          eventAddress: tid,
          tokenId: data?.user?.tokenId
        });
      }
    }, 500);
  }, []);
  useEffect(() => {
    const getMetaData = async () => {
      const meta = await getMeta(data?.basic?.metaURL);
      setMetaData(meta);
    };
    getMetaData();
  }, [data?.basic?.metaURL]);

  const qrUrl =
    window.location.origin + window.location.pathname + `?mode=sign&tid=${tid}&cid=${address}`;
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{data?.basic?.name || 'Ticken'}</h1>
        {isSigned && <div className={styles.written}>written off</div>}
        <img
          className={styles.bg_title}
          src={data?.basic?.metaURL && renderNftImg((metaData as any)?.image || '')}
          alt=""
        />
        <div>
          <div className={styles.title}>
            {!isSigned && mode === 'detail' && (
              <img onClick={genQrCode} width={20} height={20} src={qrCode} alt="" />
            )}
          </div>
        </div>
      </div>
      <p className={styles.desc}>{(metaData as any)?.description}</p>
      <div className={styles.meetInfo}>
        <div style={{ marginBottom: '12px' }} className={styles.infoItem}>
          <label>
            <img width={21} height={21} src={Where} alt="" />
            Location
          </label>
          <span>{(metaData as any)?.location}</span>
        </div>

        <div className={styles.infoItem}>
          <label>
            <img width={21} height={21} src={When} alt="" />
            Time
          </label>
          <span>
            {data?.basic?.holdTime &&
              dayjs.unix(Number(data?.basic?.holdTime)).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.tokenInfo}>
        <p>
          <label>Creator</label>
          <span className={styles.elc}>{data?.basic?.creator || '-'}</span>
        </p>
        <p>
          <label>Token Standard</label>
          <span>ERC721</span>
        </p>
        <p>
          <label>Asset contract</label>
          <span>Nymph</span>
        </p>
        <p>
          <label style={{ wordBreak: 'keep-all', width: '113px' }}>Token id</label>
          <span className={styles.elc}>{data?.user?.tokenId?.toString() || '-'}</span>
        </p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.footer}>
        {mode === 'mint' && (
          <Button onClick={_fissionMint} block color="primary" size="large">
            Get it
          </Button>
        )}
        {
          // 可以加入&没有登记过
          mode === 'sign' && data?.user?.isSigner && (
            <Button onClick={Sign} block color="primary" size="large">
              Write off
            </Button>
          )
        }
        {
          // 可以加入&没有登记过
          mode === 'detail' && data?.user?.isSigner && (
            <Button style={{ marginTop: '10px' }} onClick={Sign} block color="primary" size="large">
              Write off
            </Button>
          )
        }
        {
          // 可以加入&没有登记过
          mode === 'sign' && isSigned && (
            <p className={styles.signTip}>The other party has already registered</p>
          )
        }
        {mode === 'detail' && data?.user?.canInvite && (
          <Button onClick={copyInvite} block color="primary" size="large">
            Invite
          </Button>
        )}
      </div>
      <Dialog
        visible={visible}
        style={{
          width: 300,
          background: 'white'
        }}
        content={
          <div>
            <QRCode size={260} value={qrUrl} renderAs="canvas" />
          </div>
        }
        closeOnAction
        onClose={() => {
          setVisible(false);
        }}
        closeOnMaskClick={true}
        actions={[
          {
            key: 'confirm',
            text: 'close'
          }
        ]}
      />
    </div>
  );
};

export default Detail;
