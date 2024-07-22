// src/components/SymbolSelector.tsx
"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../store/cryptoSlice';
import { AppDispatch } from '../store/store';
import styles from './SymbolSelector.module.css';

const SymbolSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(event.target.value));
  };

  return (
    <div className={styles.container}>
    <select onChange={handleChange}>
      <option value="bitcoin">BITCOIN (BTC)</option>
      <option value="ethereum">ETHEREUM (ETH)</option>
      <option value="ethereans">ETHEREANS (OS)</option>
      <option value="binamon">BINAMON (BMON)</option>
      <option value="bitclouds">BITCLOUDS (BCS)</option>
    </select>
    </div>
  );
};

export default SymbolSelector;
