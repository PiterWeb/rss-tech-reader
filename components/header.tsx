import { FunctionComponent } from 'react';
import styles from '../styles/header.module.css';

const Header: FunctionComponent = () => {
  return (
    <header id={styles.header}>
      <h1>RSS Tech Reader</h1>
    </header>
  );
}

export default Header;