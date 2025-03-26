import { getAllProjects } from '@/actions/project'
import NotFound from '@/components/ui/global/not-found'
import ProjectCard from '@/components/ui/global/project-card/ProjectCard'
import Projects from '@/components/ui/global/projects/Projects'

import React from 'react'

const DashboardPage = async() => {
    const allprojects = await getAllProjects()
  return (
    <div className='w-full flex flex-col gap-6 relative md:p-0 p-4'>
        <div className='flex flex-col-reverse items-start w-full gap-6 sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex flex-col item-start'>
                <h1 className='text-2xl font-semibold text-vivid'>
                    Projects
                </h1>
                <p className='text-base font-normal dark:text-primary '>
                    All of your work in one place
                </p>
            </div>
        </div>


        {/* {Projects} */}
       {allprojects.data && allprojects.data.length > 0 ?(
        <Projects projects={allprojects.data}/>
       ):(
        <NotFound/>
       )}
     </div>
  )
}

export default DashboardPage