import MessageGrid from '../components/molecules/MessageGrid/MessageGrid';
import NavBar from '../components/molecules/NavBar/NavBar';
import { db, auth } from '../utils/db/index'

export async function getStaticPaths() {
  let ids;

  //Not functional for now (in fact it crashes), TODO: Fix this
  auth.listUsers().then((userRecords) => {
    ids = userRecords.map(entry => ({params: {
      id: entry.id
    }}))
  }).catch((error) => console.log(error));

  return {
    paths: ids,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  
  const entries = await db.collection('messages').where("uid", "==", params.id).orderBy('createdAt').get();
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
      <NavBar />
      <h1>{messages[0].name}</h1> {/* We can use messages[0] because all of the messages will have the same 'name' attribute */}
      <MessageGrid messages={messages} />
    </div>
  )
}