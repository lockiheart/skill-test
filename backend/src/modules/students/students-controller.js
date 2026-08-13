const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");
const z = require("zod");

const getAllStudentsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    search: z.string().stringFormat(/([A-Za-z0-9 ])+/).optional(), // Limit to safe SQL characters and spaces
    class: z.string().stringFormat(/([A-Za-z0-9 ])+/).optional(),
    section: z.string().stringFormat(/([A-Za-z0-9 ])+/).optional(),
});

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
    //write your code

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    //write your code

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    //write your code

});

const handleStudentStatus = asyncHandler(async (req, res) => {
    //write your code

});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
