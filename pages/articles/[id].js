import Head from 'next/head';
import Link from "next/link";
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import { useRouter } from "next/router";

import 'highlight.js/styles/night-owl.css';
import { client } from '../../libs/client';
import { formatDate } from '../../src/utils/date';
import styles from '../../styles/Articles.module.scss';
import Layout from '../../src/components/Layout/Layout';

export default function BlogId({ articles, highlightedBody }) {
  return (
    <Layout>
      <Head>
        <title>
          {articles.title}
        </title>
      </Head>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <h1 className={styles.title}>{articles.title}</h1>
            <time className={styles.time} dateTime={formatDate(articles.createdAt ?? '', 'YYYY-MM-DD')}>
              {formatDate(articles.createdAt ?? '', 'YYYY/MM/DD')}
            </time>
            {articles.tags.map((tag) => (
              <span key={tag['tag']} className={styles.tag}>{tag['tag']}</span>
            ))}
          </div>
          <p className={styles.desc}>{articles.desc}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: highlightedBody,
            }}
            className={styles.post}
          />
          <Link href="/">
            <div className={styles.more}>
              <p className={styles.moreText}>back</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "articles", queries: { offset: 0, limit: 100 }});
  const paths = data.contents.map((content) => `/articles/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "articles", contentId: id });

  const $ = cheerio.load(data.body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })

  return {
    props: {
      articles: data,
      highlightedBody:$.html()
    },
  };
};
