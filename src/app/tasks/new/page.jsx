"use client"
import { useRouter, useParams } from "next/navigation"
import { useState, useEffect } from "react"


export default function FormPage() {
    const router = useRouter()
    const params = useParams()

    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    })

    const updateTask = async () => {
        try {
            const res = await fetch(`/api/tasks/${params.id}`,{
                method:"PUT",
                body: JSON.stringify(newTask),
                headers:{
                    "Content-Type":"application/json",
                }
            })
            const data = await res.json();
            router.push('/')
            router.refresh()
        } catch (error) {
            console.log(error);
        }
    };





    const getTask = async ()=>{
        const res = await fetch(`/api/tasks/${params.id}`);
        const data = await res.json();
        setNewTask({
            title: data.title,
            description: data.description,
        })
    }

    ////////////////////////////////

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!params.id){
            try {
                const res = await fetch("/api/tasks", {
                    method: "POST",
                    body: JSON.stringify(newTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json()
    
    
                if (res.status === 200) { //ver si esta todo ok
                    router.push('/')
                    router.refresh()
                }
    
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            updateTask()
        }
    }

    ////////////////////////////

    const handleChange = (e) => {
        // console.log(e.target.name)
        // console.log(e.target.value)
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
        // console.log(newTask);
    }

    ////////////////////////////////////////
    const handleDelete = async () => {
        if (window.confirm("seguro que desea eliminar?")) {
            const res = await fetch(`/api/tasks/${params.id}`, {
                method: "DELETE",
            })

        }
        router.push('/')
        router.refresh()
    }


    useEffect(()=>{
        if (params.id){
            getTask()
        }
    },[])


    return (
        <div>
            <h1>
                {!params.id ? "Create Task" : "Update Task"}
            </h1>
            <button onClick={handleDelete}>delete</button>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange} value={newTask.title} />
                <textarea name="description" placeholder="Description" onChange={handleChange} value={newTask.description}></textarea>
                <button>
                    {
                        !params.id ? "Create" : "Update"
                    }
                </button>
            </form>
        </div>
    )
}