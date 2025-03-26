'use client'
import { Project } from '@prisma/client'
import React from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../sidebar'
import { Button } from '../../button'
import { it } from 'node:test'
import { JsonValue } from '@prisma/client/runtime/library'
import { toast } from 'sonner'
import { useSlidesStore } from '@/store/useSlideStore'
import { useRouter } from 'next/navigation'

type Props = {
    recentProjects: Project[]
}

const RecentOpen = ({recentProjects}: Props) => {
  const router = useRouter()
  const {setSlides} = useSlidesStore()

  const handleClick = (projectId: string, slides:JsonValue)=>{
    if(!projectId || ! slides){
      toast.error('Project not found',{
        description:'Please try again',
      })
      return 
    }

    setSlides(JSON.parse(JSON.stringify(slides)))
    router.push(`/presentation/${projectId}`)
  }

  return  recentProjects.length>0 ? (
      <SidebarGroup>
        <SidebarGroupLabel>
          Recently Opened
        </SidebarGroupLabel>
        <SidebarMenu>
          {recentProjects.length > 0 
          ? recentProjects.map((item)=> (
              <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild tooltip={item.title} className={`hover:bg-primary-80`}> 
                <Button variant={'link'} onClick={()=> handleClick(item.id, item.slides)} className={`text-xs items-center justify-start`}>
                  <span>{item.title}</span>
                </Button>
    
              </SidebarMenuButton>
            </SidebarMenuItem>
           )
           ) : ''}
        </SidebarMenu>
      </SidebarGroup>
    ):(
    ''
  )
}

export default RecentOpen