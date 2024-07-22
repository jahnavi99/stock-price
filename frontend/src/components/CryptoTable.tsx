// src/components/CryptoTable.tsx
"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchCryptoData } from '../api/cryptoApi';
import { setData } from '../store/cryptoSlice';
import styles from './CryptoTable.module.css';

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const symbol = useSelector((state: RootState) => state.crypto.symbol);
  const data = useSelector((state: RootState) => state.crypto.data);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCryptoData(symbol);
      dispatch(setData(result));
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  return (
    <div className={styles.container}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Price</th>
          <th className={styles.th}>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, index) => (
          <tr key={index}>
            <td className={styles.td}>{entry.price}</td>
            <td className={styles.td}>{entry.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default CryptoTable;
