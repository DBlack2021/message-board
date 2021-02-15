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
        <title>{"Profile Page"}</title>
      </Head>
      <NavBar />
      {JSON.parse(messages)[0] ?
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <img src={JSON.parse(messages)[0].photoURL} style={{ borderRadius: '100%', padding: '10px', alignSelf: 'center', width: '128px', height: '128px' }} />
          <h1 style={{ textAlign: 'center', marginTop: '0px' }}>{JSON.parse(messages)[0].authorName}'s Messages:</h1>
          <MessageGrid messages={messages} />
        </div>
        :
        <h1 style={{ textAlign: 'center' }}>No Messages Found!</h1>
      }
    </div>
  )
}