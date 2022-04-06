import Head from "next/head";
import Link from "next/link";
import { SITE_TITLE } from "../../utils/meta";

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <img src="/images/logo.png" width={160} />
        </h1>
        <nav className={styles.nav}>
          <Link href="/">home</Link>
          <a>about</a>
        </nav>
      </div>
    </header>
  )
}

export default Header;
