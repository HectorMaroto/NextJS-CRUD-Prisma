import TaskCard from '@/components/TaskCard';
import { prisma } from '@/lib/prisma'
import React from 'react'

async function loadTasks() {

  // Manera 1: peticion a nuestro backend: 
  // const res = await fetch('http://localhost:3000/api/tasks');
  // const data = await res.json();

  // Manera 2: obtenemos los datos directamente desde la BBDD:
  return await prisma.task.findMany();
}

// Cada 60 segundos se modificará el proyecto desplegado, para los cambios
// export const revalidate = 60;

// Para hacer que la app se actualice con cada cambio
export const dynamic = 'force-dynamic'


async function HomePage() {

  const tasks = await loadTasks();
  
  return (
    <section className=' container mx-auto'>
      <div className=' grid grid-cols-3 gap-3 mt-10'>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id}/>
        ))}
      </div>
    </section>
  )
}

export default HomePage