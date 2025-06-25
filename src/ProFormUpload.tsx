import { Form, type FormItemProps } from 'antd'
import type {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from 'antd/es/upload/interface'
import React from 'react'
import ProUpload, { type ProUploadProps } from './ProUpload'

export interface ProFormUploadProps
  extends Omit<
    FormItemProps,
    'getValueProps' | 'getValueFromEvent' | 'valuePropName'
  > {
  fieldProps?: ProUploadProps
}

function ProFormUpload({ fieldProps, ...props }: ProFormUploadProps) {
  return (
    <Form.Item
      getValueProps={(value?: Array<RcFile | string>) => {
        if (value instanceof Array) {
          return {
            fileList: value,
          }
        }
        return {
          fileList: [],
        }
      }}
      getValueFromEvent={(
        event: UploadChangeParam<UploadFile | RcFile | string>,
      ) =>
        event.fileList.map((source) => {
          if (source instanceof File || typeof source === 'string') {
            return source
          }

          return source.originFileObj!
        })
      }
      {...props}
    >
      <ProUpload formItemProps={props} {...fieldProps} />
    </Form.Item>
  )
}

export default ProFormUpload
