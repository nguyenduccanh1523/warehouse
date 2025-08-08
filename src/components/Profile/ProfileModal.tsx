import React from 'react';
import { Modal, Form, Input } from 'antd';

export interface ProfileModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onOk, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  // const [tagOptions, setTagOptions] = React.useState<string[]>([]);

  // useEffect(() => {
  //   if (open) {
  //     form.setFieldsValue(initialValues || { title: '', description: '', tags: '' });
  //     // Lấy danh sách tag khi mở modal
  //     getTags().then((tags) => {
  //       setTagOptions(tags || []);
  //     });
  //   }
  // }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Nếu là edit (có initialValues), giữ lại giá trị cũ nếu trường không nhập
      const mergedValues = {
        ...initialValues,
        ...values,
      };
      // Tách tags thành mảng nếu có, còn không thì giữ nguyên giá trị cũ hoặc []
      // mergedValues.tags = mergedValues.tags
      //   ? typeof mergedValues.tags === 'string'
      //     ? mergedValues.tags.split(',').map((t: string) => t.trim())
      //     : mergedValues.tags
      //   : [];
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
      title={initialValues ? 'Sửa Khách hàng' : 'Thêm Khách hàng mới'}
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
          label="Email"
          name="email"
          initialValue={initialValues?.email}
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        >
          <Input placeholder="Nhập email" />
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

export default ProfileModal; 