import Link from "next/link";
import { useRouter } from "next/router";

import { client } from "../../libs/client";
import { formatDate } from '../../src/utils/date';
import styles from '../../styles/Home.module.scss';
import Layout from "../../src/components/Layout/Layout";
import Mv from "../../src/components/Mv/Mv";
import Pagination from "../../src/components/Pagination/Pagination";

const PER_PAGE = 5; 

export default function BlogPageId({ articles, totalCount }) {
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

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "articles" });
  const pageNumbers = [];
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/page/${repo}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "articles", queries: { offset: (id - 1) * 5, limit: 5 }});
  return {
    props: {
      articles: data.contents,
      totalCount: data.totalCount
    },
  };
};
