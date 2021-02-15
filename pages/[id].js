import styles from '../styles/Home.module.css'
import Head from 'next/head';
import NavBar from '../components/molecules/NavBar/NavBar'
import MessageGrid from '../components/molecules/MessageGrid/MessageGrid'
import { db } from '../utils/db/index'

export async function getServerSideProps(context) {
  const userId = context.params.id;
  const entries = await db.collection('messages').where("uid", "==", userId).orderBy('createdAt', 'desc').get();

  const messages = entries.docs.map(entry => ({
    ...entry.data()
  }));

  return {
    props: {
      messages: JSON.stringify(messages)
    },
  }
}

export default function profilePage({ messages }) {
  return (
    <div>
      <Head>
        <title>{JSON.parse(messages)[0].authorName}</title>
      </Head>
      <NavBar />
      <h1 style={{ textAlign: 'center' }}>{JSON.parse(messages)[0].authorName}'s Messages:</h1>
      <MessageGrid messages={messages} />
    </div>
  )
}