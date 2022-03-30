import cheerio from 'cheerio';
import hljs from 'highlight.js';

import { client } from '../../libs/client';
import styles from '../../styles/Home.module.scss';
import 'highlight.js/styles/night-owl.css';
import Layout from '../../src/components/Layout/Layout';
import Head from 'next/head';

export default function BlogId({ articles, highlightedBody }) {
  return (
    <Layout>
      <Head>
        <title>
          {articles.title}
        </title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{articles.title}</h1>
        <p className={styles.publishedAt}>{articles.publishedAt}</p>
        <div
          dangerouslySetInnerHTML={{
            __html: highlightedBody,
          }}
          className={styles.post}
        />
      </main>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "articles" });

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
