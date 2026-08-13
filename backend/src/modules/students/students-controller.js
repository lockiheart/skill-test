const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");
const { getAllStudentsSchema, addStudentSchema, userIdSchema, studentStatusSchema } = require("./student-schemas");

// roll param exists in repository but not in the query params from task, so I am not adding it here. 
const handleGetAllStudents = asyncHandler(async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            class: className,
            section,
        } = await getAllStudentsSchema.parseAsync(req.query);
        console.log('req.query', req.query, 'parsed', { page, limit, search, className, section });

        const students = await getAllStudents({
            page,
            limit,
            name: search,
            className,
            section,
        });

        res.json({ students });
    } catch (error) {
        console.error('Error in handleGetAllStudents:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

const handleAddStudent = asyncHandler(async (req, res) => {
    try {
        const payload = addStudentSchema.parse(req.body);
        const message = await addNewStudent(payload);
        res.json(message);
    } catch (error) {
        console.error('Error in handleAddStudent:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
try {
        const userId = userIdSchema.parse(req.params.id);
        const payload = addStudentSchema.parse(req.body);
        // updateStudent function expects whole information about student
        const studentDetail = await getStudentDetail(userId);
        if (!studentDetail) {
            return res.status(404).json({ error: "Student not found" });
        }

        const updatedPayload = { ...studentDetail, ...payload, userId };
        const message = await updateStudent(updatedPayload);
        res.json(message);
    } catch (error) {
        console.error('Error in handleUpdateStudent:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    try {
        const userId = userIdSchema.parse(req.params.id);
        const student = await getStudentDetail(userId);
        res.json(student);
    } catch (error) {
        console.error('Error in handleGetStudentDetail:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    try {
        const userId = userIdSchema.parse(req.params.id);
        const { status } = studentStatusSchema.parse(req.body);
        const { id: reviewerId } = req.user;
        const message = await setStudentStatus({ userId, reviewerId, status });
        res.json(message);
    } catch (error) {
        console.error('Error in handleStudentStatus:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
