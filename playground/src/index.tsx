import '@ant-design/v5-patch-for-react-19'
import { App as AntdApp, ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import locale from 'antd/es/locale/zh_CN'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.querySelector('#app')!).render(
  <StrictMode>
    <ConfigProvider theme={{ cssVar: true, hashed: false }} locale={locale}>
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>,
)
