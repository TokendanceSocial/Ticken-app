/* eslint-disable react-hooks/exhaustive-deps */
import { useEventList } from '@/abihooks';
import React, { useEffect } from 'react';
import { useProvider } from 'wagmi';
const List: React.FC = () => {
  const { data, run } = useEventList();
  const provide = useProvider();
  useEffect(() => {
    run();
  }, []);
  console.log(777, provide, data);
  return <>111</>;
};
export default List;
