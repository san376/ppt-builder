"use client"
import React from 'react'
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type Props = {}

const NavMain = ({items,}: {
    items:{
        title: string
        url: string
        icon: React.FC<React.SVGProps<SVGSVGElement>>
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) => {
    const pathname = usePathname()
  return (
    <SidebarGroup>
        <SidebarMenu>
            {items.map((item)=>(
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} className={`${pathname.includes(item.url) && 'bg-muted'}`}>
                    <Link href={item.url} className={`text-lg ${pathname.includes(item.url) && 'font-bold'}`}>
                    <item.icon className='text-lg'></item.icon>
                    <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem> 
            ))}
        </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain