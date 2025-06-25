import { Button, Card, Form, Input } from 'antd'
import ProFormUpload from '../../src/ProFormUpload'

function App() {
  return (
    <Card
      size="small"
      style={{
        marginBlockStart: 32,
        marginInline: 'auto',
        maxWidth: 600,
      }}
    >
      <Form
        onFinish={(values) => {
          console.log(values)
        }}
      >
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <ProFormUpload label="上传文件" name="files" />
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </Card>
  )
}

export default App
