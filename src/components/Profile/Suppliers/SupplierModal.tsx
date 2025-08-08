import React from 'react';
import { Modal, Form, Input } from 'antd';

export interface SupplierModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const SupplierModal: React.FC<SupplierModalProps> = ({ open, onOk, onCancel, initialValues }) => {
  const [form] = Form.useForm();


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Nếu là edit (có initialValues), giữ lại giá trị cũ nếu trường không nhập
      const mergedValues = {
        ...initialValues,
        ...values,
      };
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
      title={initialValues ? 'Sửa Nhà Cung Cấp' : 'Thêm Nhà Cung Cấp Mới'}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={initialValues ? 'Lưu' : 'Tạo mới'}
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên"
          name="name"
          initialValue={initialValues?.name}
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>
        <Form.Item
          label="Điện thoại"
          name="phone"
          initialValue={initialValues?.phone}
          rules={[{ required: true, message: 'Vui lòng nhập điện thoại!' }]}
        >
          <Input placeholder="Nhập điện thoại" />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          initialValue={initialValues?.address}
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
        >
          <Input placeholder="Nhập địa chỉ" />
        </Form.Item>
        {/* <Form.Item
          label="Tags (chọn nhiều hoặc nhập mới, phân cách bằng dấu phẩy)"
          name="tags"
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Chọn tag hoặc nhập mới"
            options={tagOptions.map(tag => ({ label: tag, value: tag }))}
            tokenSeparators={[',']}
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default SupplierModal;