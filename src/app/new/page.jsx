'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function NewPage({ params }) {

  console.log(params);
  console.log(params.id)

  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDesc(data.description);
    })
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault(); 

    if (params.id) {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      
      router.refresh() // Para ver los cambios reflejados cuando hacemos una redireccion, ya que next guarda los cambios en la caché
      router.push('/')

    } else {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const data = await res.json()
    }
    router.push('/')
  }

  return (
    <div className=' h-screen flex justify-center items-center'>
      <form onSubmit={submit} method='' className=' bg-slate-800 p-10 lg:w-1/4 md:w-1/2' action="">
        <label htmlFor="title" className=' font-bold text-sm'>Título de la tarea</label>
        <input
          type="text"
          name="title"
          id="title"
          className=' border-gray-400 p-2 mb-4 w-full text-black'
          placeholder='Título' 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="description" className=' font-bold text-sm'>Descripción de la tarea</label>
        <textarea
          name="description"
          id='description'
          className=' text-black border-gray-400 p-2 mb-4 w-full'
          rows='3'
          placeholder='Describe tu tarea'
          onChange={(e) => setDesc(e.target.value)}
          value={description}
        >
        </textarea>
        <div className=' flex justify-evenly'>
          <button type='submit' className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Crear</button>
          {params.id && (
            <button
              onClick={async() => {
                const res = await fetch(`/api/tasks/${params.id}`, {
                  method: 'DELETE',
                })
                const data = await res.json();
                router.refresh()
                router.push('/')
              }}
              type='button' className=' bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Eliminar</button>
          )
            // Con type = 'button indicamos que ese boton no envie el formulario al servidor
          }
        </div>
      </form>
    </div>
  )
}

export default NewPage