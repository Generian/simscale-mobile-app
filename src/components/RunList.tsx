import React from 'react'
import {useSelector} from 'react-redux'
import { RootState } from '../reducers';

export const RunList = () => {
  const runs = useSelector((state: RootState) => state.runs);
  console.log(runs)
  return (
  <span>{runs}</span>
  )
};

export default RunList