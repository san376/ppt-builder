'use client'
import { Project } from '@prisma/client'
import React from 'react'
import {motion} from 'framer-motion'
import { containerVariants } from '@/lib/constants'
import ProjectCard from '../project-card/ProjectCard'


type Props = {
    projects: Project[]
}

const Projects  = ({projects}: Props) => {
  console.log('ProjectCard:', ProjectCard);
  if (!ProjectCard) {
    throw new Error('ProjectCard is undefined. Check the import path.');
  }
  
  return (
    <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' variants={containerVariants} initial='hidden' animate='visible'>
        {projects.map((project,id) => (
            <ProjectCard key={id} projectId={project?.id} title={project?.title} createdAt={project?.createdAt.toString()} isDelete={project?.isDeleted} slideData={project?.slides} themeName={project.themeName} 
           />
        ))}
    </motion.div>
  )
}

export default Projects 