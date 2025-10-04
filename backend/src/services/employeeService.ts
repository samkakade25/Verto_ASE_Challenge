import { PrismaClient, Employee} from "@prisma/client";
import { Param, PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new  PrismaClient();



export const createEmployee = async (data: {name: string, email: string, position: string}): Promise<Employee> => {
    try {
        return await  prisma.employee.create({ data });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('Email already exists');
        }
        throw error;
    }
};

export const getAllEmployees = async (): Promise<Employee[]> => {
    return await prisma.employee.findMany();
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    return await prisma.employee.findUnique({ where: {id} });
}

export const updateEmployee = async (id: number, data: Partial<{name: string, email: string, position: string}>): Promise<Employee> => {
    try {
        return await prisma.employee.update({ where: {id}, data });
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new Error('Employee not found');
          }
          if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error('Email already exists');
          }
          throw error;
    }

};

export const deleteEmployee = async (id: number): Promise<Employee> => {
    try {
        return await prisma.employee.delete({ where: { id } });
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
          throw new Error('Employee not found');
        }
        throw error;
      }
}

