import type { EmployeeFormProps } from "../types/employee";
import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { ZodError, z } from "zod";

const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  position: z.string().min(1, "Position is required"),
});

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      employeeSchema.parse(values);
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      if (error instanceof ZodError) {
        error.issues.forEach((err) => {
          form.setFields([
            { name: err.path[0] as string, errors: [err.message] },
          ]);
        });
      }
    }
  };

  return (
    <Modal
      open={visible}
      title={initialValues ? "Edit Employee" : "Add Employee"}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="position"
          label="Position"
          rules={[{ required: true, message: "Position is required" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
