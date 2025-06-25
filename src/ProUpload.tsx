import { Form, Typography, Upload, type UploadProps } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'
import React, { useMemo, useRef, type ReactNode } from 'react'
import type { ProFormUploadProps } from './ProFormUpload'
import UploadButton, { type UploadButtonProps } from './UploadButton'
import UploadList, { type UploadListProps } from './UploadList'

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
   * @description 自定义渲染展示文件列表
   */
  uploadListRender?: () => ReactNode
  /**
   * @description 补充内容说明
   */
  extra?:
    | ((showFilePicker: () => void) => React.ReactNode)
    | React.ReactNode
    | string
  formItemProps?: ProFormUploadProps
  listProps?: UploadListProps
  buttonProps?: UploadButtonProps
}

function ProUpload({
  rules,
  readonly,
  uploadListRender,
  extra,
  formItemProps,
  listProps,
  buttonProps,
  ...props
}: ProUploadProps) {
  const filePickerRef = useRef<HTMLDivElement>(null)
  const showFilePicker = () => {
    filePickerRef.current?.click()
  }

  const fieldWatch = Form.useWatch<Array<RcFile | string> | undefined>(
    formItemProps?.name,
  )
  const fieldValue = useMemo(() => fieldWatch ?? [], [fieldWatch])
  const fieldBlobURLs = useMemo(
    () =>
      fieldValue.map((source) => {
        if (source instanceof File) {
          return window.URL.createObjectURL(source)
        }
        return source
      }),
    [fieldValue],
  )

  const form = Form.useFormInstance()
  const removeFile = (index: number, validation = true) => {
    form.setFieldsValue({
      [formItemProps?.name]: fieldValue.toSpliced(index, 1),
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
      {...props}
      disabled={readonly || props.disabled}
      style={{
        verticalAlign: 'middle',
        ...props.style,
      }}
    >
      <span ref={filePickerRef} style={{ display: 'none' }} />
      <div onClick={(ev) => ev.stopPropagation()}>
        {uploadListRender?.() || (
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <UploadList
              readonly={readonly}
              disabled={props.disabled}
              maxCount={props.maxCount}
              fieldCount={fieldValue.length}
              onRemove={removeFile}
              onLastFileClick={showFilePicker}
              fieldBlobURLs={fieldBlobURLs}
              {...listProps}
            />
            <UploadButton
              readonly={readonly}
              disabled={props.disabled}
              maxCount={props.maxCount}
              fieldCount={fieldValue.length}
              onClick={showFilePicker}
              size="small"
              {...buttonProps}
            />
          </div>
        )}
        {!readonly && extra ? (
          typeof extra === 'string' ? (
            <Typography.Paragraph
              type="secondary"
              style={{
                marginBlockStart: 8,
                marginBlockEnd: 0,
              }}
            >
              {extra}
            </Typography.Paragraph>
          ) : typeof extra === 'function' ? (
            extra(showFilePicker)
          ) : (
            extra
          )
        ) : null}
      </div>
    </Upload>
  )
}

export default ProUpload
