'use client'
import { itemVariants,themes } from '@/lib/constants'
import { useSlidesStore } from '@/store/useSlideStore'
import { JsonValue } from '@prisma/client/runtime/library'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ThumnailPreview from './thumbnail-preview'
import { timeAgo } from '@/lib/utils'
import AlertDialogBox from '../alert-dialog'
import {Button} from '@/components/ui/button'
import { toast } from 'sonner'
import { deleteProject, recoverProject } from '@/actions/project'

type Props = {
    projectId: string
    title: string
    createdAt: string
    isDelete?: boolean
    slideData: JsonValue
    themeName: string
}

const ProjectCard = ({createdAt,projectId,slideData,title,themeName,isDelete}: Props) => {
    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const {setSlides} = useSlidesStore()
    const router = useRouter()
    const handleNavigation = ()=>{
        setSlides(JSON.parse(JSON.stringify(slideData)))
        router.push(`/presentation/${projectId}`)
    }


    const theme= themes.find((theme)=> theme.name === themeName || themes[0])

    const handleRecover = async()=>{
        setLoading(true)
       if(!projectId){
        setLoading(false)
        toast.error('Error',{
            description:'Project not found.',
        })
        return
       }
       try {
        const res = await recoverProject(projectId)
        if(res.status !== 200){
            toast.error('Oppse!',{
                description: res.error || 'Something went wrong',
            })
            return
        }
        setOpen(false)
        router.refresh()
        toast.success('Success',{
            description:'project recovered successfully.',
        })
       } catch (error) {
        console.log(error)
        toast.error('Oppse!',{
            description:'Something went wrong. Please contact support',
        })
       }
    }



    const handleDelete = async()=>{
        setLoading(true)
        if(!projectId){
         setLoading(false)
         toast.error('Error',{
             description:'Project not found.',
         })
         return
        }
        try {
         const res = await deleteProject(projectId)
         if(res.status !== 200){
             toast.error('Oppse!',{
                 description: res.error || 'Failed to delete the project',
             })
             return
         }
         setOpen(false)
         router.refresh()
         toast.success('Success',{
             description:'project deleted successfully.',
         })
        } catch (error) {
         console.log(error)
         toast.error('Oppse!',{
             description:'Something went wrong. Please contact support',
         })
        }
    }

  return <motion.div 
  className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${!isDelete && 'hover:bg-muted/50'}`} 
  variants={itemVariants}>
    <div className='relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer' onClick={handleNavigation}>
    {/* <ThumnailPreview theme={theme}/> */}
    {/* // WIP: Add the Slide data
    // slide=(json.parse(JSON.stringify(slideData))?.[0]) */}
    </div>

    <div className='w-full'>
        <div className='space-y-1'>
              <h3 className='font-semibold text-bsse text-primary line-clamp-1'>
            {title} This is the titles that I want to see
              </h3>
              <div className='flex w-full justify-between items-center gap-2'>
                <p className='texxt-sm text-muted-foreground' 
                suppressContentEditableWarning>{timeAgo(createdAt)}
                </p>
                 {isDelete ?(
                    <AlertDialogBox description='This will recover your Project and restore your data.'
                    className='bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700'
                    open={open} loading={loading} handleOpen={()=> setOpen(!open)} onClick={handleRecover}>
                        <Button
                        size="sm"
                        variant="ghost"
                        className='bg-background-80 dark:hover:bg-background-90'
                        disabled={loading}
                        >
                            Recover
                        </Button>
                    </AlertDialogBox>
                     ):(
                        <AlertDialogBox description='This will delete your Project and send to trash.'
                        className='bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                        open={open} loading={loading} handleOpen={()=> setOpen(!open)} 
                        onClick={handleDelete}>
                            <Button
                            size="sm"
                            variant="ghost"
                            className='bg-background-80 dark:hover:bg-background-90'
                            disabled={loading}
                            >
                               Delete
                            </Button>
                        </AlertDialogBox>
                         )} 
              </div>
        </div>
    </div>

  </motion.div>
}

export default ProjectCard