/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { Provider } from '@ethersproject/providers';
import { Toast } from 'antd-mobile';
import { useState, useCallback } from 'react';
import { useProvider, useAccount, useSigner } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/constanst/token';
import { EventInfo } from '@/typechain-types/contracts/Admin';
import { Admin__factory, Event__factory } from '@/typechain-types/index';
import { BigNumber, ContractTransaction } from 'ethers';

export interface fetchEventDetailReq {
  eventAddress: string;
  address: string;
}
export function useFetchEventDetail() {
  return useAbi<EventInfo.AllInfoStructOutput, fetchEventDetailReq>(
    (provide, _singer, _account, _?: any) => {
      const connect = Event__factory.connect(_.eventAddress, provide);
      return connect.allUserInfo(_.address);
    }
  );
}

export function useEventList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useAbi<EventInfo.AllInfoStructOutput[], any>((provide, _singer, account) => {
    const connect = Admin__factory.connect(CONTRACT_ADDRESS, provide);
    return connect.eventsForUser(account.address);
  });
}

// invite
export interface MintReq {
  eventAddress: string;
  address: string;
  price: BigNumber;
}
export function useEventMint() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useAbi<ContractTransaction, MintReq>((_provide, _singer, account, _) => {
    console.log(1111, account.address, _.address, _.price);
    const connect = Event__factory.connect(_.eventAddress, _singer);
    return connect.inviteMint(account.address, _.address, {
      value: _.price
    });
  });
}

// sign

export interface SignReq {
  eventAddress: string;
  address: string;
}
export function useSign() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useAbi<ContractTransaction, SignReq>((_provide, _singer, _account, _) => {
    const connect = Event__factory.connect(_.eventAddress, _singer);
    return connect.sign(_.address);
  });
}

// isSign
export interface isSignReq {
  eventAddress: string;
  tokenId: BigNumber;
}
export function useIsSign() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useAbi<boolean, isSignReq>((provide, _singer, _account, _) => {
    const connect = Event__factory.connect(_.eventAddress, provide);
    return connect.isSign(_.tokenId);
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useAbi<T extends any, U>(
  _run: (provide: Provider, singer: any, account: any, req?: U) => Promise<T>
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const provide = useProvider();
  const account = useAccount();
  const singer = useSigner();
  const run = useCallback(
    async (req?: U) => {
      setLoading(true);
      try {
        const data = await _run(provide, singer.data, account, req);
        setData(data);
        setLoading(false);
        return data;
      } catch (error: any) {
        setLoading(false);
        Toast.show(error.toString());
        setError(error);
        return Promise.reject(error);
      } finally {
        setLoading(false);
      }
    },
    [_run, account, provide, singer.data]
  );
  return {
    data,
    run,
    error,
    loading
  };
}
