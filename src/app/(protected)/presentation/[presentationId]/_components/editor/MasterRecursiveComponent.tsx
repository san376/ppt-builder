'use client'
import { ContentItem } from '@/lib/types'
import React, { useCallback } from 'react'
import {motion} from 'framer-motion'
import { Heading1 } from '@/components/ui/global/editor/components/Headings'
import { Value } from '@radix-ui/react-select'
import { cn } from '@/lib/utils'

type MasterRecursiveComponentProps = {
  content: ContentItem
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void
  isPreview?: boolean
  isEditable?: boolean
  slideId: string
  index?: number
}

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, index, isPreview,isEditable}) => {

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        onContentChange(content.id, e.target.value)
      },
      [content.id, onContentChange] 
    )

    const commonProps = {
      placeholder: content.placeholder,
      Value: content.content as string,
      onchange: handleChange,
      isPreview: isPreview,
    }

    const animationProps = {
      initial : {opacity: 0, y:20},
      animate: {opacity: 1, y: 0},
      transition: {duration:0.5},
    }

    // WIP: complete types

    switch (content.type) {
      case 'heading1':
        return (
          <motion.div className="w-full h-full">
          <Heading1 {...commonProps}/>
        </motion.div>
        )

        case 'column':
          if(Array.isArray(content.content)){
            return (
              <motion.div
              {...animationProps}
                className={cn('w-full h-full flex flex-col',
                  content.className
                )}
              >
                {content.content.length>0
                 ? (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number)=> (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {!isPreview &&
                      !subItem.restrictToDrop &&
                      subIndex === 0 &&
                      isEditable && <DropZone/>}
                    </React.Fragment>
                  )
                 ) : ''}
              </motion.div>
            )
          }
          return null
      default:
        return <h1>Nothing</h1>
    }
  }
)


ContentRenderer.displayName = 'contentRender'

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> =
  React.memo(
    ({
      content,
      onContentChange,
      slideId,
      index,
      isPreview = false,
      isEditable = true,
    }) => {
      if (isPreview) {
        return (
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        );
      }
      return (
        <React.Fragment>
          <ContentRenderer
            content={content}
            onContentChange={onContentChange}
            isPreview={isPreview}
            isEditable={isEditable}
            slideId={slideId}
            index={index}
          />
        </React.Fragment>
      )
    }
  );


  MasterRecursiveComponent.displayName='MasterRecursiveComponent'

