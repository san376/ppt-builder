'use client'
import { getProjectById } from '@/actions/project'
import { themes } from '@/lib/constants'
import { useSlidesStore } from '@/store/useSlideStore'
import { Loader2 } from 'lucide-react'
import { useTheme } from 'next-themes'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import Navbar from './_components/Navbar/Navbar'

type Props = {}

const Page = (props: Props) => {

    const params = useParams()
    const {setTheme} = useTheme()
    const [isLoading, setIsLoading] = useState(true)

    const {setSlides, setProject, currentTheme,setCurrentTheme} = useSlidesStore()


    useEffect(()=>{
        ;(async()=>{
            try {
                const res = await getProjectById(params.presentationId as string)
                if (res.status !== 200 || !res.data) {
                    toast.error('Error', {
                      description: 'Unable to fetch project',
                    })
                    redirect('/dashboard')
                  }
                  
                  const findTheme = themes.find(
                    (theme) => theme.name === res.data.themeName
                  )
                  
                  setCurrentTheme(findTheme || themes[0])
                  setTheme(findTheme?.type === 'dark' ? 'dark' : 'light')
                  setProject(res.data)
                  setSlides(JSON.parse(JSON.stringify(res.data.slides)))
                  
            } catch (error) {
                toast.error('Error',{
                    description:'An Unexpected error occured',
                })
            } 
            finally{
                setIsLoading(false)
            }
        })()
    },[])

    if(isLoading){
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader2 className='w-8 h-8 animate-spin texxt-primary'/>
            </div>
        )
    }


  return (
    <DndProvider backend={HTML5Backend}>
        <div>
            <Navbar presentationId={params.presentation as string}/>
            <div className='flex-1 flex overflow-hidden pt-16'
            style={{
                color: currentTheme.accentColor,
                fontFamily: currentTheme.fontFamily,
                backgroundColor: currentTheme.backgroundColor,
                
            }}
            >

            </div>
        </div>
    </DndProvider>
  )
}

export default Page