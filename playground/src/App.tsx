import { Space } from 'antd'
import BasicUsage from './components/BasicUsage'
import MaxCount from './components/MaxCount'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
        paddingBlockStart: 32,
      }}
    >
      <Space direction="vertical">
        <BasicUsage />
        <MaxCount />
      </Space>
    </div>
  )
}

export default App
