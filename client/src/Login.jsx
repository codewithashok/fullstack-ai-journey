import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert } from 'antd'

const { Title, Text } = Typography
const BASE_URL = import.meta.env.VITE_API_URL

function Login({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [form] = Form.useForm()

  const isLogin = mode === 'login'

  const switchMode = () => {
    setMode(isLogin ? 'signup' : 'login')
    setError(null)
    setSuccess(null)
    form.resetFields()
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    const url = `${BASE_URL}/auth/${isLogin ? 'login' : 'signup'}`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || (isLogin ? 'Login failed' : 'Signup failed'))
        return
      }
      if (!isLogin) {
        form.resetFields()
        setMode('login')
        setSuccess('Account created! Please log in.')
        return
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onLogin(data.user)
    } catch {
      setError('Could not connect to server. Make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          {isLogin ? 'Sign In' : 'Create Account'}
        </Title>

        {success && <Alert message={success} type="success" showIcon style={{ marginBottom: 16 }} />}
        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {!isLogin && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: 'Name is required' },
                { min: 2, message: 'At least 2 characters' },
              ]}
            >
              <Input placeholder="Enter your name" size="large" />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Password is required' },
              { min: 2, message: 'At least 2 characters' },
            ]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          {!isLogin && (
            <Form.Item name="city" label="City">
              <Input placeholder="Enter your city (optional)" size="large" />
            </Form.Item>
          )}

          <Form.Item style={{ marginBottom: 8 }}>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </Text>
          <Button type="link" style={{ padding: 0 }} onClick={switchMode}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Login
