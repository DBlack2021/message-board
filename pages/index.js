import styles from '../styles/Home.module.css'
import { db } from '../utils/db/index'
import MessageGrid from '../components/molecules/MessageGrid/MessageGrid'
import Head from 'next/head'
import NavBar from '../components/molecules/NavBar/NavBar';


export async function getServerSideProps() {
  const entries = await db.collection('messages').orderBy('createdAt', 'desc').limit(51).get(); //50 messages and then the 1 because there's an empty space :)
  const data = entries.docs.map(entry => ({
    id: entry.id,
    ...entry.data()
  }));

  return {
    props: {
      data: JSON.stringify(data),
    },
  }
}

export default function Home({ data: messages }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Message Board</title>
      </Head>
      <NavBar />
      <MessageGrid messages={messages} />
    </div>
  )
}
