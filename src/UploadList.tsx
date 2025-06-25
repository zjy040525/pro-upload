import { DeleteOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import React from 'react'
import UploadItem from './UploadItem'

export interface UploadListProps {
  readonly?: boolean
  disabled?: boolean
  fileUrls?: Array<string>
  onRemove?: (index: number) => void
  height?: number
  width?: number
}

function UploadList(props: UploadListProps) {
  // 只读状态下并且没有文件时显示
  if (props.readonly && !props.fileUrls?.length) {
    return <Typography.Text>-</Typography.Text>
  }

  // 没有文件不显示
  if (!props.fileUrls?.length) {
    return null
  }

  return props.fileUrls.map((fileUrl, index) => (
    <UploadItem
      key={fileUrl}
      hoverable={!props.readonly && !props.disabled}
      size="small"
      imgProps={{
        src: fileUrl,
        draggable: false,
      }}
      dropdownProps={{
        disabled: props.readonly || props.disabled,
        menu: {
          items: [
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
        },
      }}
      width={props.width}
      height={props.height}
    />
  ))
}

export default UploadList
