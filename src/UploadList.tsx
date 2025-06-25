import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'
import UploadItem, { type UploadItemProps } from './UploadItem'

export interface UploadListProps {
  /**
   * @description 只读状态下不显示下拉菜单
   */
  readonly?: boolean
  /**
   * @description 禁用点击交互,禁用移入卡片焦点效果
   */
  disabled?: boolean
  /**
   * @description 文件blob列表
   */
  fieldBlobURLs?: Array<string>
  /**
   * @description 最大上传数量
   */
  maxCount?: number
  /**
   * @description 当前上传数量
   */
  fieldCount?: number
  /**
   * @description 点击删除按钮的回调
   */
  onRemove?: (index: number) => void
  /**
   * @description 最大上传数量为1并且已经上传了1个文件后的卡片点击回调
   */
  onLastFileClick?: () => void
  /**
   * @description 卡片高度
   */
  height?: number | string
  /**
   * @description 卡片宽度
   */
  width?: number | string
  /**
   * @description 图片显示模式,固定宽度或高度,另一个方向自动撑开,默认在设定的高度和宽度内等比缩放
   */
  fitMode?: 'widthFix' | 'heightFix'
  itemProps?: UploadItemProps
}

function UploadList({ itemProps, ...props }: UploadListProps) {
  // 只读状态下并且没有文件时显示
  if (props.readonly && !props.fieldBlobURLs?.length) {
    return <Typography.Text style={{ lineHeight: '32px' }}>-</Typography.Text>
  }

  // 没有文件不显示
  if (!props.fieldBlobURLs?.length) {
    return null
  }

  const width = props.fitMode
    ? props.fitMode === 'widthFix'
      ? props.width
      : 'unset'
    : props.width

  const height = props.fitMode
    ? props.fitMode === 'heightFix'
      ? props.height
      : 'unset'
    : props.height

  const isReplaceable = props.maxCount === 1 && props.fieldCount === 1

  return props.fieldBlobURLs.map((fieldBlobURL, index) => (
    <UploadItem
      key={fieldBlobURL}
      hoverable={!props.disabled}
      size="small"
      {...itemProps}
      width={width}
      height={height}
      imgProps={{
        src: fieldBlobURL,
        draggable: false,
        preview: !props.disabled,
        ...itemProps?.imgProps,
      }}
      dropdownProps={{
        disabled: props.readonly || props.disabled,
        menu: {
          items: [
            ...(isReplaceable
              ? [
                  {
                    key: 'replace',
                    icon: <UploadOutlined />,
                    label: '替换',
                    onClick: props.onLastFileClick,
                  },
                ]
              : []),
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              danger: true,
              label: '删除',
              onClick() {
                props.onRemove?.(index)
              },
            },
          ],
          ...itemProps?.dropdownProps?.menu,
        },
        ...itemProps?.dropdownProps,
      }}
    />
  ))
}

export default UploadList
