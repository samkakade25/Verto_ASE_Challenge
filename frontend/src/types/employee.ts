export interface Employee {
    id: number,
    name: string,
    email: string,
    position: string
}

export interface GetEmployeesResponse {
    message: string;
    employees: Employee[];
}

export interface EmployeeFormProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: Omit<Employee, 'id'> | Partial<Employee>) => void;
    initialValues?: Employee;
}