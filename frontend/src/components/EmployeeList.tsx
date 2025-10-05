import { useEffect, useState } from "react";
import {
  deleteEmployee,
  getEmployees,
  updateEmployee,
  createEmployee,
} from "../services/api";
import type { Employee } from "../types/employee";
import { message, Button, Input, Table, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [modalvisible, setModalVisible] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(undefined);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      console.log(response);
      setEmployees(response.employees);
      setFilteredEmployees(response.employees);
    } catch (error) {
      message.error("Failed to fetch employees");
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter((emp) => emp.id !== id));
      message.success("Employee deleted");
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const handleSubmit = async (
    values: Omit<Employee, "id"> | Partial<Employee>
  ) => {
    try {
      if (editingEmployee) {
        const updated = await updateEmployee(editingEmployee.id, values);
        setEmployees(
          employees.map((emp) => (emp.id === updated.id ? updated : emp))
        );
      } else {
        const newEmployee = await createEmployee(
          values as Omit<Employee, "id">
        );
        setEmployees([...employees, newEmployee]);
      }
      fetchEmployees();
      setModalVisible(false);
      message.success("Operation successful");
    } catch (error) {
      message.error("Operation failed");
    }
  };

  const handleAdd = () => {
    setEditingEmployee(undefined);
    setModalVisible(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Position", dataIndex: "position", key: "position" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Employee) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <Button type="primary" onClick={handleAdd}>
            Add Employee
          </Button>
          <Input
            placeholder="Search by name"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          ></Input>
        </div>
        <Table
          dataSource={filteredEmployees || []}
          columns={columns}
          rowKey="id"
        ></Table>
        <EmployeeForm
          visible={modalvisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSubmit}
          initialValues={editingEmployee}
        />
      </div>
    </>
  );
};

export default EmployeeList;
