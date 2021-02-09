import MessageGrid from '../components/molecules/MessageGrid/MessageGrid';
import db from '../utils/db/index'

export async function getStaticPaths() {

  const users = await db.collection('users').get();
  const ids = users.docs.map(entry => ({params: {
    id: entry.id
  }}));

  return {
    paths: ids,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let user;

  await db.collection('users').doc(params.id).get().then(snapshot => {
    user = snapshot.data()
  });
  
  const entries = await db.collection('messages').where("uid", "==", params.id).orderBy('createdAt').get();
  const messages = entries.docs.map(entry => ({
    ...entry.data()
  }));

  return {
    props: {
      user: user,
      messages: JSON.stringify(messages)
    },
  } 
}

export default function profilePage({ user, messages }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <MessageGrid messages={messages} />
    </div>
  )
}