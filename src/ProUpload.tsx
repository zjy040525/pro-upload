import { Form, Typography, Upload, type UploadProps } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'
import React, { useMemo, useRef, type ReactNode } from 'react'
import type { ProFormUploadProps } from './ProFormUpload'
import UploadButton from './UploadButton'
import UploadList from './UploadList'

export interface ProUploadProps
  extends Omit<UploadProps, 'showUploadList' | 'beforeUpload'> {
  /**
   * @description 上传规则校验
   */
  rules?: Array<{ validator: (file: RcFile) => boolean }>
  /**
   * @description 只读,隐藏上传交互卡片,无法上传文件
   */
  readonly?: boolean
  /**
   * @description 展示文件列表额外选项
   */
  uploadListRender?: () => ReactNode
  /**
   * @description 补充内容说明
   */
  extra?: React.ReactNode | string
  /**
   * @description Form.Item
   */
  formItemProps?: ProFormUploadProps
  /**
   * @description 卡片高度
   */
  height?: number
  /**
   * @description 卡片宽度
   */
  width?: number
}

function ProUpload({
  rules,
  readonly,
  uploadListRender,
  extra,
  formItemProps,
  width = 102,
  height = 102,
  ...props
}: ProUploadProps) {
  const filePicker = useRef<HTMLDivElement>(null)

  const fieldWatch = Form.useWatch<Array<RcFile | string> | undefined>(
    formItemProps?.name,
  )
  const blobUrls = useMemo(
    () =>
      fieldWatch?.map((source) => {
        if (source instanceof File) {
          return window.URL.createObjectURL(source)
        }
        return source
      }),
    [fieldWatch],
  )

  const form = Form.useFormInstance()

  const removeFile = (index: number, validation = true) => {
    const deletedField = fieldWatch?.toSpliced(index, 1)

    form.setFieldsValue({
      [formItemProps?.name]: deletedField,
    })

    if (validation) {
      void form.validateFields([formItemProps?.name]).catch()
    }
  }

  return (
    <Upload
      showUploadList={false}
      beforeUpload={(file) => {
        if (rules?.length) {
          for (const rule of rules) {
            if (rule.validator(file)) {
              continue
            }

            // https://github.com/ant-design/ant-design/issues/15561#issuecomment-475108235
            return Upload.LIST_IGNORE
          }
        }
        return false
      }}
      disabled={readonly || props.disabled}
      {...props}
      style={{ display: 'flex' }}
    >
      <span ref={filePicker} hidden />
      {uploadListRender?.() || (
        <div
          style={{
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <UploadList
            fileUrls={blobUrls}
            readonly={readonly}
            disabled={props.disabled}
            width={width}
            height={height}
            onRemove={removeFile}
          />
          <UploadButton
            size="small"
            maxCount={props.maxCount}
            fieldCount={fieldWatch?.length}
            readonly={readonly}
            disabled={props.disabled}
            width={width}
            height={height}
          />
        </div>
      )}
      {extra ? (
        typeof extra === 'string' ? (
          <Typography.Paragraph
            type="secondary"
            style={{
              marginBlockStart: 8,
              marginBlockEnd: 0,
            }}
            onClick={(ev) => {
              ev.stopPropagation()
            }}
          >
            {extra}
          </Typography.Paragraph>
        ) : (
          extra
        )
      ) : null}
    </Upload>
  )
}

export default ProUpload
