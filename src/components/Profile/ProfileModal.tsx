import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

export interface ProfileModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onOk, onCancel, initialValues }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || { title: '', description: '', tags: '' });
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Nếu là edit (có initialValues), giữ lại giá trị cũ nếu trường không nhập
      const mergedValues = {
        ...initialValues,
        ...values,
      };
      // Tách tags thành mảng nếu có, còn không thì giữ nguyên giá trị cũ hoặc []
      mergedValues.tags = mergedValues.tags
        ? typeof mergedValues.tags === 'string'
          ? mergedValues.tags.split(',').map((t: string) => t.trim())
          : mergedValues.tags
        : [];
      onOk(mergedValues);
      form.resetFields();
    } catch (err) {}
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title={initialValues ? 'Sửa bài viết' : 'Thêm bài viết mới'}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={initialValues ? 'Lưu' : 'Tạo mới'}
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả" rows={3} />
        </Form.Item>
        <Form.Item
          label="Tags (phân cách bằng dấu phẩy)"
          name="tags"
        >
          <Input placeholder="tag1, tag2, ..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal; 