const { z } = require("zod");

const sqlSafeString = () => z.string().stringFormat(/([A-Za-z0-9 ])+/).trim();

const getAllStudentsSchema = z.object({
    page: z.coerce.number().int().positive().default(1).optional(),
    limit: z.coerce.number().int().positive().default(10).optional(),
    search: sqlSafeString().optional(), // Limit to safe SQL characters and spaces
    class: sqlSafeString().optional(),
    section: sqlSafeString().optional(),
});

const addStudentSchema = z.object({
    userId: z.coerce.number().int().positive().optional(),
    name: sqlSafeString().min(1, "Name is required").optional(),
    gender: sqlSafeString().optional(),
    phone: z.e164().optional(), // phone number in E.164 format
    email: z.email().optional(),
    dob: sqlSafeString().optional(),
    currentAddress: z.string().stringFormat(/([A-Za-z0-9 ,.])+/).trim().optional(),
    permanentAddress: z.string().stringFormat(/([A-Za-z0-9 ,.])+/).trim().optional(),
    fatherName: sqlSafeString().optional(),
    fatherPhone: z.e164().optional(), // phone number in E.164 format
    motherName: sqlSafeString().optional(),
    motherPhone: z.e164().optional(), // phone number in E.164 format
    guardianName: sqlSafeString().optional(),
    guardianPhone: z.e164().optional(), // phone number in E.164 format
    relationOfGuardian: sqlSafeString().optional(),
    systemAccess: z.coerce.boolean().optional(),
    class: sqlSafeString().optional(),
    section: sqlSafeString().optional(),
    admissionDate: sqlSafeString().optional(),
    roll: z.coerce.number().int().positive("Roll must be a positive integer").optional(),
});

module.exports = {
    getAllStudentsSchema,
    addStudentSchema,
};
