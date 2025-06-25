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
  width?: number
  /**
   * @description 卡片高度
   */
  height?: number
}

function UploadItem({
  imgProps,
  dropdownProps,
  width,
  height,
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
      menu={{
        ...dropdownProps?.menu,
        onClick(ev) {
          ev.domEvent.stopPropagation()
          dropdownProps?.menu?.onClick?.(ev)
        },
      }}
    >
      <Card
        {...props}
        {...heightStyle}
        style={{
          width,
          height,
          ...props.style,
        }}
        onClick={(ev) => {
          ev.stopPropagation()
          props.onClick?.(ev)
        }}
      >
        <Image {...imgProps} />
      </Card>
    </Dropdown>
  )
}

export default UploadItem
