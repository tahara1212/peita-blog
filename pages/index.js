import Link from "next/link";
import { client } from "../libs/client";
import Layout from "../src/components/Layout/Layout";

export default function Home({ articles }) {
  return (
    <Layout>
      <ul>
        {articles.map((articles) => (
          <li key={articles.id}>
            <Link href={`/articles/${articles.id}`}>
              <a>{articles.title}</a>
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
