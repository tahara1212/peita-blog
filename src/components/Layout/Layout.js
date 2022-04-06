import Head from 'next/head';
import Link from 'next/link';
import { SITE_TITLE } from '../../utils/meta';
import Header from '../Header/Header';

import styles from './Layout.module.scss';

const Layout = ({children}) => {
  return (
    <div className="">
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Header />
      <main className={styles.container}>{children}</main>
    </div>
  )
}

export default Layout;
