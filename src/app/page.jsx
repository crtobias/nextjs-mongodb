import { connectDB } from "@/utils/mongoose"
import Task from "@/models/Task"
import Link from "next/link"


async function loadTask() {
  connectDB()
  const tasks = await Task.find()
  return tasks
}


export default async function HomePage() {
  const tasks = await loadTask()






  return (
    <div>
      BUSCAR
      {tasks.map(task => (
        <Link href={`/tasks/${task._id}`}>
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}