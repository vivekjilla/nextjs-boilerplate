import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import Username from '../../components/Username';
import styles from '../../styles/Home.module.css';
import usePosts from '../hooks/usePosts';

export interface Comment {
  id: number;
  body: string;
}

interface Props {
  props: {
    comment: Comment;
  };
}

export async function getStaticProps(): Promise<Props> {
  const url = 'http://my-json-server.typicode.com/typicode/demo/comments';
  const res = await fetch(url);
  const comments = await res.json();

  const comment = comments[1];

  return {
    props: {
      comment,
    },
  };
}

export default function Home({ comment }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: posts } = usePosts();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h3>

        <Username />
        <strong>Server-rendered comment: </strong>
        <span>{`id: ${comment?.id} - body: ${comment?.body}`}</span>

        <br />

        <strong>Fetched post count:</strong>
        <span>{`Length: ${posts?.length}`}</span>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}>
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
