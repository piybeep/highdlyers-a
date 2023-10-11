import Head from 'next/head'

import s from './index.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Главная страница</title>
        <meta property="og:title" content="Главная страница" key="title" />
      </Head>
      <main className={s.main}>
        123
      </main>
    </>
  )
}
