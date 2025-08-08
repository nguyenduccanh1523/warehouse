import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { getCustomers } from "../../../services/customer.api";
import dayjs from "dayjs";

export interface OrderModalProps {
  open: boolean;
  onOk: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

const OrderModal: React.FC<OrderModalProps> = ({
  open,
  onOk,
  onCancel,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [customerOptions, setCustomerOptions] = React.useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (open) {
      // Properly format the initial values for the form
      const formValues = initialValues
        ? {
            order_date: initialValues.order_date
              ? dayjs(initialValues.order_date)
              : null,
            customer_id: initialValues.customer_id,
          }
        : {
            order_date: null,
            customer_id: "",
          };

      form.setFieldsValue(formValues);

      // Lấy danh sách khách hàng khi mở modal
      getCustomers()
        .then((result) => {
          setCustomerOptions(result.data || []);
        })
        .catch((error) => {
          console.error("Error fetching customers:", error);
          setCustomerOptions([]);
        });
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Format the date properly for submission
      const formattedValues = {
        ...values,
        order_date: values.order_date
          ? values.order_date.format("YYYY-MM-DD")
          : null,
      };

      // Nếu là edit (có initialValues), giữ lại giá trị cũ nếu trường không nhập
      const mergedValues = {
        ...initialValues,
        ...formattedValues,
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
      title={initialValues ? "Sửa đơn hàng" : "Thêm đơn hàng mới"}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={initialValues ? "Lưu" : "Tạo mới"}
      cancelText="Hủy"
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Ngày đặt hàng"
          name="order_date"
          rules={[{ required: true, message: "Vui lòng nhập ngày đặt hàng!" }]}
        >
          <DatePicker
            placeholder="Chọn ngày đặt hàng"
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
          />
        </Form.Item>
        <Form.Item
          label="Khách hàng"
          name="customer_id"
          rules={[{ required: true, message: "Vui lòng chọn khách hàng!" }]}
        >
          <Select
            allowClear
            placeholder="Chọn khách hàng"
            options={customerOptions.map((customer) => ({
              label: customer.name,
              value: customer.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OrderModal;
