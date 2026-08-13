const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");
const { getAllStudentsSchema, addStudentSchema, userIdSchema, studentStatusSchema } = require("./student-schemas");

// roll param exists in repository but not in the query params from task, so I am not adding it here. 
const handleGetAllStudents = asyncHandler(async (req, res) => {
    let parsed;
    try {
        parsed = await getAllStudentsSchema.parseAsync(req.query);

    } catch (error) {
        console.error('Error in handleGetAllStudents:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const {
            page = 1,
            limit = 10,
            search,
            class: className,
            section,
        } = parsed;
    const students = await getAllStudents({
        page,
        limit,
        name: search,
        className,
        section,
    });
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    let payload;
    try {
        payload = addStudentSchema.parse(req.body);
    } catch (error) {
        console.error('Error in handleAddStudent:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    let userId;
    let payload;
    try {
        userId = userIdSchema.parse(req.params.id);
        payload = addStudentSchema.parse(req.body);
    } catch (error) {
        console.error('Error in handleUpdateStudent:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // updateStudent function expects whole information about student
    const studentDetail = await getStudentDetail(userId);
    if (!studentDetail) {
        return res.status(404).json({ error: "Student not found" });
    }

    const updatedPayload = { ...studentDetail, ...payload, userId };
    const message = await updateStudent(updatedPayload);
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    let userId;
    try {
        userId = userIdSchema.parse(req.params.id);
    } catch (error) {
        console.error('Error in handleGetStudentDetail:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const student = await getStudentDetail(userId);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    let userId;
    let status;
    try {
        userId = userIdSchema.parse(req.params.id);
        ({ status } = studentStatusSchema.parse(req.body));
    } catch (error) {
        console.error('Error in handleStudentStatus:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    const { id: reviewerId } = req.user;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    let userId;
    try {
        userId = userIdSchema.parse(req.params.id);
    } catch (error) {
        console.error('Error in handleDeleteStudent:', error);
        if (error.name === 'ZodError') {
            res.status(400).json({ error: "Validation error", details: error.errors });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const message = await deleteStudent(userId);
    res.json(message);
})

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent
};
