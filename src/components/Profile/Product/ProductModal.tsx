import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { getSuppliers } from "../../../services/supplier.api";

export interface ProductModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onOk,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [supplierOptions, setSupplierOptions] = React.useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(
        initialValues || { name: "", quantity: "", price: "", supplier_id: "" }
      );
      // Lấy danh sách nhà cung cấp khi mở modal
      getSuppliers()
        .then((result) => {
          setSupplierOptions(result.data || []);
        })
        .catch((error) => {
          console.error("Error fetching suppliers:", error);
          setSupplierOptions([]);
        });
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
      title={initialValues ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={initialValues ? "Lưu" : "Tạo mới"}
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên"
          name="name"
          initialValue={initialValues?.name}
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>
        <Form.Item
          label="Số lượng"
          name="quantity"
          initialValue={initialValues?.quantity}
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <Input type="number" placeholder="Nhập số lượng" />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          initialValue={initialValues?.price}
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <Input type="number" placeholder="Nhập giá" />
        </Form.Item>
        <Form.Item
          label="Nhà cung cấp"
          name="supplier_id"
          initialValue={initialValues?.supplier_id}
          rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp!" }]}
        >
          <Select
            allowClear
            placeholder="Chọn nhà cung cấp "
            options={supplierOptions.map((supplier) => ({
              label: supplier.name,
              value: supplier.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
