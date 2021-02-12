import styles from '../styles/Home.module.css'
import { db } from '../utils/db/index'
import MessageGrid from '../components/molecules/MessageGrid/MessageGrid'
import ProfileDropDown from '../components/molecules/ProfileDropDown/ProfileDropDown';
import SubmitMessage from '../components/atoms/SubmitMessage/SubmitMessage';
import NavBar from '../components/molecules/NavBar/NavBar';

export async function getServerSideProps(context) {
  const entries = await db.collection('messages').orderBy('createdAt').get();
  const data = entries.docs.map(entry => ({
    ...entry.data()
  }));

  return {
    props: {
      data: JSON.stringify(data)
    },
  }
}

export default function Home({ data: messages }) {
  return (
    <div className={styles.container}>
      <NavBar />
      <MessageGrid messages={messages} />
    </div>
  )
}
