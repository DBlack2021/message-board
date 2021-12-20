import Head from 'next/head';
import NavBar from '../../components/molecules/NavBar/NavBar'
import { db } from '../../utils/db/index'
import Message from '../../components/atoms/Message/Message';

export async function getServerSideProps(context) {
  const messageId = context.params.id;
  const message = await (await db.collection('messages').doc(messageId).get()).data();

  return {
    props: {
      id: messageId,
      message: JSON.stringify(message)
    },
  }
}

export default function messagePage( { id, message } ) {

  const parsedMessage = JSON.parse(message);

  return (
    <div>
      <Head>
        <title>Message from { message.authorName }</title>
      </Head>
      <NavBar />
      {
        message ? // todo : fix because {} is still truthy
        <Message 
          photoURL={parsedMessage.photoURL} 
          id={id} 
          uid={parsedMessage.uid} 
          text={parsedMessage.text} 
          edited={parsedMessage.edited} 
          authorName={parsedMessage.authorName} />
        :
        <h1 style={{ textAlign: 'center' }}>The Requested Message Cannot Be Found!</h1>
      }
    </div>
  )
}