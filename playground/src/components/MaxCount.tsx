import { Button, Card, Divider, Form, Input } from 'antd'
import { useState } from 'react'
import { ProFormUpload } from '../../../src'

function MaxCount() {
  const [code, setCode] = useState<Record<string, unknown>>()

  return (
    <Card title="最大上传数量" style={{ width: 600 }}>
      <Form onFinish={setCode} initialValues={{ albumName: '我的相册' }}>
        <Form.Item name="albumName" label="相册名称">
          <Input />
        </Form.Item>
        <ProFormUpload
          name="photos"
          label="图片"
          fieldProps={{
            maxCount: 1,
          }}
        />
        <ProFormUpload
          name="photos2"
          label="图片"
          fieldProps={{
            maxCount: 3,
          }}
        />
        <Button type="primary" htmlType="submit">
          预览
        </Button>
        <Divider />
        <code>{JSON.stringify(code)}</code>
      </Form>
    </Card>
  )
}

export default MaxCount
