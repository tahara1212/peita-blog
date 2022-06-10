import Link from "next/link";

import { client } from "../libs/client";
import { formatDate } from '../src/utils/date';
import styles from '../styles/Home.module.scss';
import Layout from "../src/components/Layout/Layout";
import Mv from "../src/components/Mv/Mv";
import Pagination from "../src/components/Pagination/Pagination";

export default function Home({ articles, totalCount }) {
  return (
    <Layout>
      <Mv />
      <div className={styles.container}>
        <ul>
          {articles.map((articles) => (
            <li key={articles.id} className={styles.articleList}>
              <Link href={`/articles/${articles.id}`}>
                <a className={styles.link}>
                  <div className={styles.thumnail}>
                    {articles.eye_catch && 
                      <img src={articles.eye_catch.url} className={styles.image} /> 
                    }
                  </div>
                  <div className={styles.post}>
                    <time className={styles.time} dateTime={formatDate(articles.createdAt ?? '', 'YYYY-MM-DD')}>
                      {formatDate(articles.createdAt ?? '', 'YYYY/MM/DD')}
                    </time>
                    <h2 className={styles.title}>{articles.title}</h2>
                    <p className={styles.text}>{articles.desc}</p>
                    <div className={styles.more}>
                      <p className={styles.moreText}>more</p>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <Pagination totalCount={totalCount} />
      </div>
    </Layout>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "articles", queries: { limit: 20, offset: 0, limit: 5 }});
  
  return {
    props: {
      articles: data.contents,
      totalCount: data.totalCount
    },
  };
};
