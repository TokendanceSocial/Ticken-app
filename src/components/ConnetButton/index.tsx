import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './index.module.scss';

const Connect: React.FC = () => {
  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => <div className={styles.btn} onClick={openConnectModal}></div>}
    </ConnectButton.Custom>
  );
};
export default Connect;
