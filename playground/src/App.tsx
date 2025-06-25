import { Button, Card, Form } from 'antd'
import { ProFormUpload } from '../../src'

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
        <ProFormUpload label="上传文件" name="files" />
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form>
    </Card>
  )
}

export default App
