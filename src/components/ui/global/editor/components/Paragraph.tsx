import React from 'react'

interface ParagraphProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
    className?: string
    styles?: React.CSSProperties
    isPreview?: boolean
}

const Paragraph = React.forwardRef<ParagraphProps>() => {
  return (
    <div>Paragraph</div>
  )
}

export default Paragraph