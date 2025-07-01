import {
  Card,
  Dropdown,
  Image,
  version,
  type CardProps,
  type DropDownProps,
  type ImageProps,
} from 'antd'
import React from 'react'

export interface UploadItemProps extends CardProps {
  /**
   * @description 图片属性
   */
  imgProps?: ImageProps
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
      </Card>
    </Dropdown>
  )
}

export default UploadItem
