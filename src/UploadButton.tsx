import { PlusOutlined } from '@ant-design/icons'
import { Card, type CardProps, Typography, version } from 'antd'
import React from 'react'

export interface UploadButtonProps extends CardProps {
  extra?: React.ReactNode
  readonly?: boolean
  disabled?: boolean
  maxCount?: number
  fieldCount?: number
  width?: number
  height?: number
}

function UploadButton({
  extra,
  readonly,
  disabled,
  maxCount,
  fieldCount,
  width,
  height,
  ...props
}: UploadButtonProps) {
  if (
    readonly ||
    (fieldCount !== undefined &&
      maxCount !== undefined &&
      fieldCount === maxCount)
  ) {
    return null
  }

  const heightStyle: CardProps = version.startsWith('5')
    ? {
        styles: {
          ...props.styles,
          body: {
            ...props.styles?.body,
            height: '100%',
          },
        },
      }
    : {
        bodyStyle: {
          height: '100%',
          ...props.bodyStyle,
        },
      }

  return (
    <Card
      hoverable={!disabled}
      {...props}
      {...heightStyle}
      style={{
        width,
        height,
        ...props.style,
      }}
    >
      {extra || (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <PlusOutlined />
          <Typography.Text>上传</Typography.Text>
        </div>
      )}
    </Card>
  )
}

export default UploadButton
