import { FileTextOutlined } from '@ant-design/icons'
import {
  Card,
  Dropdown,
  Image,
  Typography,
  version,
  type CardProps,
  type DropDownProps,
  type ImageProps,
} from 'antd'
import React, { useLayoutEffect, useState } from 'react'

export interface UploadItemProps extends CardProps {
  /**
   * @description 图片属性
   */
  imgProps?: ImageProps
  /**
   * @description 除了图片之外的其他文件属性
   */
  miscProps?: Partial<{
    style: React.CSSProperties
    extra: React.ReactNode
  }>
  /**
   * @description 下拉菜单属性
   */
  dropdownProps?: DropDownProps
  /**
   * @description 卡片宽度
   */
  width?: number | string
  /**
   * @description 卡片高度
   */
  height?: number | string
}

function UploadItem({
  imgProps,
  miscProps,
  dropdownProps,
  width = 102,
  height = 102,
  ...props
}: UploadItemProps) {
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

  const [isImage, setIsImage] = useState(false)

  useLayoutEffect(() => {
    if (imgProps?.src) {
      fetch(imgProps.src)
        .then((r) => r.blob())
        .then((blob) => {
          if (blob.type.startsWith('image/')) {
            setIsImage(true)
          }
        })
    }
  }, [imgProps])

  return (
    <Dropdown
      {...dropdownProps}
      overlayStyle={{
        // 1001 is Image default zIndex
        zIndex: 1000,
      }}
      menu={dropdownProps?.menu}
    >
      <Card
        {...props}
        {...heightStyle}
        style={{
          width,
          height,
          ...props.style,
        }}
      >
        {isImage ? (
          <Image
            {...imgProps}
            wrapperStyle={{
              width: '100%',
              height: '100%',
              ...imgProps?.wrapperStyle,
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              ...imgProps?.style,
            }}
          />
        ) : (
          <div
            style={{
              ...miscProps?.style,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => {
              if (!isImage && imgProps?.src) {
                window.open(imgProps.src, '_blank')
              }
            }}
          >
            {miscProps?.extra || (
              <Typography.Text>
                <FileTextOutlined style={{ fontSize: '200%' }} />
              </Typography.Text>
            )}
          </div>
        )}
      </Card>
    </Dropdown>
  )
}

export default UploadItem
