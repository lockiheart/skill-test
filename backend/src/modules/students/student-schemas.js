const { z } = require("zod");

const getAllStudentsSchema = z.object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().default(10).optional(),
    search: z.string().trim().optional(),
    class: z.string().trim().optional(),
    section: z.string().trim().optional(),
});

const addStudentSchema = z.object({
    userId: z.coerce.number().int().positive().optional(),
    name: z.string().trim().min(1, "Name is required").optional(),
    gender: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    email: z.string().trim().email("Invalid email").optional(),
    dob: z.string().trim().optional(),
    currentAddress: z.string().trim().optional(),
    permanentAddress: z.string().trim().optional(),
    fatherName: z.string().trim().optional(),
    fatherPhone: z.string().trim().optional(),
    motherName: z.string().trim().optional(),
    motherPhone: z.string().trim().optional(),
    guardianName: z.string().trim().optional(),
    guardianPhone: z.string().trim().optional(),
    relationOfGuardian: z.string().trim().optional(),
    systemAccess: z.coerce.boolean().optional(),
    class: z.string().trim().optional(),
    section: z.string().trim().optional(),
    admissionDate: z.string().trim().optional(),
    roll: z.coerce.number().int().positive("Roll must be a positive integer").optional(),
}).passthrough();

module.exports = {
    getAllStudentsSchema,
    addStudentSchema,
};
