import Router from 'next/router';
import Link from 'next/link';

import styles from './Pagination.module.scss';

const Pagination = ({ totalCount }) => {
  const PER_PAGE = 5;

  const range = (start, end) => 
    [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul className={styles.pagination}>
      <li className={`${styles.pager} ${styles.prev}`}>
        <Link href="/page/1">
          <a className={styles.number}></a>
        </Link>
      </li>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
        <li key={index} className={styles.pager}>
          <Link href={ `/page/${number}`}>
            <a className={styles.number}>{number}</a>
          </Link>
        </li>
      ))}
      <li className={`${styles.pager} ${styles.next}`}>
        <Link href="/page/2">
          <a className={styles.number}></a>
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
