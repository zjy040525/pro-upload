import { PlusOutlined } from '@ant-design/icons'
import { Card, type CardProps, Typography, version } from 'antd'
import React from 'react'

export interface UploadButtonProps extends CardProps {
  /**
   * @description 自定义上传文本
   */
  extra?: React.ReactNode
  /**
   * @description 只读状态下不显示上传交互卡片
   */
  readonly?: boolean
  /**
   * @description 禁用点击交互,禁用移入卡片焦点效果
   */
  disabled?: boolean
  /**
   * @description 最大上传数量
   */
  maxCount?: number
  /**
   * @description 当前上传数量
   */
  fieldCount?: number
  /**
   * @description 卡片宽度
   */
  width?: number | string
  /**
   * @description 卡片高度
   */
  height?: number | string
}

function UploadButton({
  extra,
  readonly,
  disabled,
  maxCount,
  fieldCount,
  width = 102,
  height = 102,
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
