import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { getProducts } from "../../../services/product.api";
import { getOrders } from "../../../services/order.api";

export interface OrderItemModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const OrderItemModal: React.FC<OrderItemModalProps> = ({
  open,
  onOk,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [productOptions, setProductOptions] = React.useState<
    { id: string; name: string; price: number }[]
  >([]);
  const [orderOptions, setOrderOptions] = React.useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(
        initialValues || {
          order_id: "",
          quantity: "",
          price: "",
          product_id: "",
        }
      );
      // Lấy danh sách sản phẩm khi mở modal
      getProducts()
        .then((result) => {
          setProductOptions(result.data || []);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setProductOptions([]);
        });

      getOrders()
        .then((result) => {
          setOrderOptions(result.data || []);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setOrderOptions([]);
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
          label="Đơn hàng"
          name="order_id"
          initialValue={initialValues?.order_id}
          rules={[{ required: true, message: "Vui lòng chọn đơn hàng!" }]}
        >
          <Select
            allowClear
            placeholder="Chọn đơn hàng"
            disabled={initialValues}
            options={orderOptions.map((order) => ({
              label: order.name,
              value: order.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Sản phẩm"
          name="product_id"
          initialValue={initialValues?.product_id}
          rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
        >
          <Select
            allowClear
            placeholder="Chọn sản phẩm"
            disabled={initialValues}
            options={productOptions.map((product) => ({
              label: product.name,
              value: product.id,
            }))}
            onChange={(value) => {
              const selectedProduct = productOptions.find(
                (product) => product.id === value
              );
              if (selectedProduct) {
                form.setFieldsValue({
                  price: selectedProduct.price,
                });
              }
            }}
          />
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
      </Form>
    </Modal>
  );
};

export default OrderItemModal;
