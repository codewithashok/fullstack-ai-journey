import { useEffect, useState } from 'react'
import { Table, Typography, Button, Modal, Form, Input, Popconfirm, Space, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import 'antd/dist/reset.css'

const { Title } = Typography
const BASE_URL = import.meta.env.VITE_API_URL
const API = `${BASE_URL}/users`
const UPLOAD_API = `${BASE_URL}/upload`

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [saving, setSaving] = useState(false)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [form] = Form.useForm()

  const fetchUsers = () => {
    setLoading(true)
    fetch(API)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => message.error('Failed to fetch users. Make sure the server is running.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  const openCreateModal = () => {
    setEditingUser(null)
    setPhotoUrl(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEditModal = (user) => {
    setEditingUser(user)
    setPhotoUrl(user.profile_photo || null)
    form.setFieldsValue({ name: user.name, email: user.email, city: user.city })
    setModalOpen(true)
  }

  const handleUpload = async ({ file, onSuccess, onError }) => {
    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(UPLOAD_API, { method: 'POST', body: formData })
      const data = await res.json()
      setPhotoUrl(data.url)
      onSuccess(data)
      message.success('Photo uploaded')
    } catch {
      onError(new Error('Upload failed'))
      message.error('Photo upload failed')
    }
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    setSaving(true)
    try {
      const payload = { ...values, profile_photo: photoUrl }

      if (editingUser) {
        await fetch(`${API}/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        message.success('User updated')
      } else {
        await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        message.success('User created')
      }
      setModalOpen(false)
      fetchUsers()
    } catch {
      message.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' })
      message.success('User deleted')
      fetchUsers()
    } catch {
      message.error('Failed to delete user')
    }
  }

  const columns = [
    {
      title: 'Photo',
      dataIndex: 'profile_photo',
      key: 'profile_photo',
      render: (url) => url
        ? <img src={url} alt="profile" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
        : '—'
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <Space>
          <Button size="small" onClick={() => openEditModal(user)}>Edit</Button>
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>Users</Title>
        <Button type="primary" onClick={openCreateModal}>Add User</Button>
      </div>

      <Table dataSource={users} columns={columns} rowKey="id" loading={loading} />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
        confirmLoading={saving}
        okText={editingUser ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Name is required' },
              { min: 2, message: 'Name must be at least 2 characters' },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input placeholder="Enter city" />
          </Form.Item>
          <Form.Item label="Profile Photo">
            {photoUrl && (
              <img src={photoUrl} alt="preview" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', marginBottom: 8, display: 'block' }} />
            )}
            <Upload customRequest={handleUpload} showUploadList={false} accept="image/*">
              <Button icon={<UploadOutlined />}>Upload Photo</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default App
