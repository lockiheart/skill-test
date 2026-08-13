const { z } = require("zod");

const getAllStudentsSchema = z.object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().default(10).optional(),
    search: z.string().trim().optional(),
    class: z.string().trim().optional(),
    section: z.string().trim().optional(),
});

const addStudentSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Invalid email"),
    class_name: z.string().trim().min(1, "Class is required").optional(),
    section_name: z.string().trim().min(1, "Section is required").optional(),
    roll: z.coerce.number().int().positive("Roll must be a positive integer").optional(),
    dob: z.string().trim().optional(),
    father_name: z.string().trim().optional(),
    father_phone: z.string().trim().optional(),
});

module.exports = {
    getAllStudentsSchema,
    addStudentSchema,
};
