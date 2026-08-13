const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");
const { getAllStudentsSchema, addStudentSchema, userIdSchema, studentStatusSchema } = require("./student-schemas");

// roll param exists in repository but not in the query params from task, so I am not adding it here. 
const handleGetAllStudents = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 10,
        search,
        class: className,
        section,
    } = await getAllStudentsSchema.parseAsync(req.query);

    const students = await getAllStudents({
        page,
        limit,
        search,
        className,
        section,
    });

    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = addStudentSchema.parse(req.body);
    const message = await addNewStudent(payload);
    res.json(message);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const userId = userIdSchema.parse(req.params.id);
    const payload = addStudentSchema.parse(req.body);
    const message = await updateStudent({ ...payload, userId });
    res.json(message);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const userId = userIdSchema.parse(req.params.id);
    const student = await getStudentDetail(userId);
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const userId = userIdSchema.parse(req.params.id);
    const { status } = studentStatusSchema.parse(req.body);
    const { id: reviewerId } = req.user;
    const message = await setStudentStatus({ userId, reviewerId, status });
    res.json(message);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
