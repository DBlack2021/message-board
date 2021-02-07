import styles from '../styles/Home.module.css'
import { TestMessages } from '../TestData/TestData'
import MessageGrid from '../components/molecules/MessageGrid/MessageGrid'

export default function Home() {
  return (
    <div className={styles.container}>
      <MessageGrid messages={TestMessages} />
    </div>
  )
}
