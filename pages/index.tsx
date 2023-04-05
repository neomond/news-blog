import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import NewsArticleEntry from "@/components/NewsArticleEntry";

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const newsResponse: NewsResponse = await response.json();

  return {
    props: { newsArticles: newsResponse.articles },
  };
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title"> Breaking News - NextJS News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <NewsArticleEntry article={newsArticles[0]} />
      </main>
    </>
  );
}
