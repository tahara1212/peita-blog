import Link from "next/link";
import { client } from "../libs/client";
import Layout from "../src/components/Layout/Layout";
import { formatDate } from '../src/utils/date';

import styles from '../styles/Home.module.scss';

export default function Home({ articles }) {
  console.log(articles);
  return (
    <Layout>
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
