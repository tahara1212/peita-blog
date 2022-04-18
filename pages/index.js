import Link from "next/link";

import { client } from "../libs/client";
import { formatDate } from '../src/utils/date';
import styles from '../styles/Home.module.scss';
import Layout from "../src/components/Layout/Layout";
import Mv from "../src/components/Mv/Mv";

export default function Home({ articles }) {
  return (
    <Layout>
      <Mv />
      <ul className={styles.container}>
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
    </Layout>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "articles" });

  return {
    props: {
      articles: data.contents,
    },
  };
};
