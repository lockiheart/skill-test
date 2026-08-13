const { z } = require("zod");

const stringFormat = (pattern, message) =>
    z.string().trim().refine((value) => pattern.test(value), {
        message,
    });

const safeString = (message = "Only letters, numbers, spaces, commas, periods, hyphens, and dots are allowed") =>
    stringFormat(/^[A-Za-z0-9 ,.-]*$/, message);

const phoneSchema = () =>
    z.string().trim().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number");

const emailSchema = () => z.string().trim().email("Invalid email");

const userIdSchema = z.coerce.number().int().positive("User ID must be a positive integer");

const getAllStudentsSchema = z.object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().default(10).optional(),
    search: safeString().optional(),
    class: safeString().optional(),
    section: safeString().optional(),
});

const addStudentSchema = z.object({
    userId: z.coerce.number().int().positive().optional(),
    name: z.string().trim().min(1, "Name is required").optional(),
    gender: safeString().optional(),
    phone: phoneSchema().optional(),
    email: emailSchema().optional(),
    dob: z.string().trim().optional(),
    currentAddress: z.string().trim().max(255).optional(),
    permanentAddress: z.string().trim().max(255).optional(),
    fatherName: z.string().trim().optional(),
    fatherPhone: phoneSchema().optional(),
    motherName: z.string().trim().optional(),
    motherPhone: phoneSchema().optional(),
    guardianName: z.string().trim().optional(),
    guardianPhone: phoneSchema().optional(),
    relationOfGuardian: z.string().trim().optional(),
    systemAccess: z.coerce.boolean().optional(),
    class: z.string().trim().optional(),
    section: z.string().trim().optional(),
    admissionDate: z.string().trim().optional(),
    roll: z.coerce.number().int().positive("Roll must be a positive integer").optional(),
}).passthrough();

const studentStatusSchema = z.object({
    status: z.coerce.boolean(),
});

module.exports = {
    stringFormat,
    safeString,
    phoneSchema,
    emailSchema,
    userIdSchema,
    getAllStudentsSchema,
    addStudentSchema,
    studentStatusSchema,
};
