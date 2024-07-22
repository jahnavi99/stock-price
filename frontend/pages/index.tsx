// src/pages/index.tsx
import React from 'react';
import CryptoTable from '../src/components/CryptoTable';
import SymbolSelector from '../src/components/SymbolSelector';
import styles from './index.module.css';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className={styles.customHeading}>Crypto and Stock Prices</h1>
      <SymbolSelector />
      <CryptoTable />
    </div>
  );
};

export default Home;
