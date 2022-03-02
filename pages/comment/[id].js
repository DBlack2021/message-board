import Head from 'next/head';
import NavBar from '../../components/molecules/NavBar/NavBar'
import { db } from '../../utils/db/index'
import Message from '../../components/atoms/Message/Message';
import MessageWithComments from '../../components/molecules/MessageWithComments/MessageWithComments';

export async function getServerSideProps(context) {
  const commentId = context.params.id;
  const comment = await (await db.collection('comments').doc(commentId).get()).data();

  const parentComment = await(await db.collection('comments').doc(comment.parent).get()).data() || false;

  return {
    props: {
      id: commentId,
      parentComment: parentComment,
      comment: JSON.stringify(comment)
    },
  }
}

export default function commentPage( { id, parentComment, comment } ) {

  const parsedComment = JSON.parse(comment);

  return (
    <div>
      <Head>
        <title>Comment from { comment.authorName }</title>
      </Head>
      <NavBar />
      {
        comment ? // todo : fix because {} is still truthy
        <MessageWithComments
          message={parsedComment}
          id={id}
          isComment={true}
          commentPage={true}
          parentIsComment={!!parentComment}
        />
        :
        <h1 style={{ textAlign: 'center' }}>The Requested Message Cannot Be Found!</h1>
      }
    </div>
  )
}