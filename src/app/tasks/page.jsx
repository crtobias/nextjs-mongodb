import { connectDB } from "../../utils/mongoose"
import Task from "../../models/Task"
import Link from "next/link"
import styles from "../../styles/task.module.css"

async function loadTask() {
  connectDB()
  const tasks = await Task.find()
  return tasks
}


export default async function HomePage() {
  const tasks = await loadTask()






  return (
    <div className={styles.allcontainer}>
      <h1 className={styles.title}>MY NOTES</h1>


      <Link href={`/tasks/new`}>
        <button className={styles.button}>ADD NOTE+</button>
      </Link>

      <section className={styles.containernote}>

      {tasks.map(task => (
        <Link href={`/tasks/${task._id}`}>
          <div key={task._id} className={styles.card}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        </Link>
      ))}

      </section>







    </div>
  )
}