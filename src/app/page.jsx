import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import styles from "../styles/landing.module.css"



export default async function Landing() {


    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>NOTAP</h1>
            
            {/* 
            <input className={styles.input} type="text" placeholder="#user"/>
            <input className={styles.input}  type="text" placeholder="#Password" />
            */}



            <Link href={`/tasks`}>
                <button className={styles.button}>Login</button>
            </Link>



        </div>
    )
}


