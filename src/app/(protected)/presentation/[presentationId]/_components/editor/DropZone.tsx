import { useSlidesStore } from '@/store/useSlideStore'
import React from 'react'

type DropZoneProps = {
    index: number
    parentId: string
    slideId: string
}

const DropZone = ({index,parentId,slideId}: DropZoneProps) => {
    const {addComponentInSlide} = useSlidesStore()
  return (
    <div>DropZone</div>
  )
}

export default DropZone