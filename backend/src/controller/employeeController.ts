import z from "zod";
import * as employeeService from "../services/employeeService";
import { Request, Response } from "express";
import { error } from "console";

const createEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  position: z.string().min(1, "Position is required"),
});

const updateEmployeeSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid email").optional(),
  position: z.string().min(1, "Position is required").optional(),
});

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const validatedData = createEmployeeSchema.parse(req.body);
    const employee = await employeeService.createEmployee(validatedData);
    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error });
    }
    return res.status(500).json({ error: (error as Error).message });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();
    return res.json({ message: "Get all the employees", employees });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
    }
    return res.json({ message: "Employee with id number", employee });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const validatedData = updateEmployeeSchema.parse(req.body);
    const employee = await employeeService.updateEmployee(id, validatedData);
    return res.json({ message: "Employee updated successfully", employee });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error });
    }
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const employee = await employeeService.deleteEmployee(id);
    return res.json({ message: "Employee deletd successfully", employee});
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
