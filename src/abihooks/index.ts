/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { Provider } from '@ethersproject/providers';
import { Toast } from 'antd-mobile';
import { ContractTransaction } from 'ethers/lib/ethers';
import { useState, useCallback } from 'react';
import { useProvider, useAccount, useSigner } from 'wagmi';
import { CONTRACT_ADDRESS } from '@/constanst/token';
import { EventInfo } from '@/typechain-types/contracts/Admin';
import { Admin__factory, Event__factory } from '@/typechain-types/index';

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
    console.log(provide, account.address);
    const connect = Admin__factory.connect(CONTRACT_ADDRESS, provide);
    return connect.eventsForUser(account.address);
  });
}
export interface createEventReq {
  name: string; // 名称
  symbol: string; // 活动缩写
  holdTime: number; // 时间
  personLimit?: number; // 人数限制
  price: number; // 价格
  rebates?: number; // 返佣比例
  meta: string; // 元数据
  receiver: string; // 返佣收款人（填写创建者地址）
  eventType: 0 | 1; // 如0为公售，1为仅限邀请
}
export function useCreateEvent() {
  // 创建活动
  return useAbi<ContractTransaction, createEventReq>((_provide, singer: any, _account, _: any) => {
    const connect = Admin__factory.connect(CONTRACT_ADDRESS, singer);
    return connect.createEvent(
      _.name,
      _.symbol,
      _.holdTime,
      _.personLimit,
      _.price,
      _.rebates,
      _.meta,
      _.receiver,
      _.eventType
    );
  });
}

export function useCloseEvent() {
  // 关闭活动
  return useAbi<ContractTransaction, string>((_provide, singer, _account, _?: any) => {
    const connect = Event__factory.connect(_, singer);
    return connect.closeEvent();
  });
}

export interface addWriteOffReq {
  eventAddress: string;
  address: string[];
}
export function useAddWriteOff() {
  // 批量增加核销人
  return useAbi<ContractTransaction, addWriteOffReq>((_provide, singer, _account, _?: any) => {
    const connect = Event__factory.connect(_.eventAddress, singer);
    return connect.batchAddSigner(_.address);
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