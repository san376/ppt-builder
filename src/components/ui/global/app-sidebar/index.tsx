"use client"
import App from 'next/app'
import {Project, User} from '@prisma/client'
import React from 'react'
import {Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,

} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '../../avatar'
import NavMain from './nav-main'
import { data } from '@/lib/constants'
import RecentOpen from './recent-open'
import NavFooter from './nav-footer'


const Appsidebar = ({recentProjects,user,...props}
    :{
        recentProjects: Project[]
    }& {user: User} & React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible='icon' className='max-w-[212px] bg-background-90' {...props}>
        <SidebarHeader className='pt-6 px-2 pb-0'>
            <SidebarMenuButton size={'lg'} className='data-[state=open]:text-Sidebar-accent-foreground'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
                    <Avatar className='h-10 w-10 rounded-full'>
                        <AvatarImage  src={'/vivid.jpeg'} alt={`vivid-logo`}/>
                        <AvatarFallback className='rounded-lg'> VI
                        </AvatarFallback>
                    </Avatar>
                </div>
                <span className='truncate text-primary text-3xl font-semibold'>{' '}Vivid</span>
            </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent className='px-2 mt-10 gap-y-6'>
          <NavMain items={data.navMain}/>
          <RecentOpen recentProjects={recentProjects}/>
        </SidebarContent>
        <SidebarFooter>
            <NavFooter prismaUser={user}/>
        </SidebarFooter>   

    </Sidebar>
  )
}

export default Appsidebar