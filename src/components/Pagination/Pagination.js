import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from "next/router";

import styles from './Pagination.module.scss';

const Pagination = ({ totalCount }) => {
  // 1ページに表示する件数
  const PER_PAGE = 5;
  
  // URLから現在のページ位置を取得
  const router = useRouter(); 
  const currentPage = Number(router.query.id);

  // ページ数
  const showPageNum = Math.ceil(totalCount / PER_PAGE);

  const range = (start, end) => {
    return [...Array(end - start + 1)].map((_, i) => start + i);
  }

  const prevArrow = () => {
    // 最初のページ以外の時、「<」を生成
    if (currentPage !== 1 && currentPage) {
      return (
        <li className={`${styles.pager} ${styles.prev}`}>
          <Link href={"/page/" + (currentPage - 1)}>
            <a className={styles.number}></a>
          </Link>
        </li>
      )
    }
  }

  const pagerNumber = (number) => {
    if (currentPage === number) {
      return (
        <li className={styles.pager}>
          <Link href={ `/page/${number}`}>
            <a className={`${styles.number} ${styles.current}`}>{number}</a>
          </Link>
        </li>
      )
    } else {
      return (
        <li className={styles.pager}>
          <Link href={ `/page/${number}`}>
            <a className={styles.number}>{number}</a>
          </Link>
        </li>
      )
    }
  }

  const nextArrow = () => {
    if (currentPage !== showPageNum && currentPage) {
      return (
        <li className={`${styles.pager} ${styles.next}`}>
          <Link href={"/page/" + (currentPage + 1)}>
            <a className={styles.number}></a>
          </Link>
        </li>
      )
    } else if (!currentPage) {
      return (
        <li className={`${styles.pager} ${styles.next}`}>
          <Link href={"/page/2"}>
            <a className={styles.number}></a>
          </Link>
        </li>
      )
    }
  }

  return (
    <ul className={styles.pagination}>
      {prevArrow()}
      {range(1, showPageNum).map((number) => (
        pagerNumber(number)
      ))}
      {nextArrow()}
    </ul>
  );
};

export default Pagination;
