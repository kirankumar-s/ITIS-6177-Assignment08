const express = require("express");
const bodyParser = require("body-parser")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(bodyParser.json());
const port = 5000;


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Assignment 08 API",
            description: "Assignment 08 API information",
            contact: {
                name: "Kiran Samatham"
            },
            servers: ["http://0.0.0.0:5000"]
        }
    },
    apis: ["app.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let students = [
    { id: 801269579, name: "Kiran", major: "MS-IT" }
]


/**
 * @swagger
 * /students:
 *  get:
 *      description: Use to request all students
 *      responses:
 *          '200':
 *              description: A successful response
 */
app.get("/students", (req, res) => {
    res.send(students);
});


/**
 * @swagger
 * /add-student:
 *   post:
 *     summary: Add a new student
 *     description: Add a new student with the "name", "major", and "id".
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Student added successfully
 *     parameters:
 *     - in: "body"
 *       name: "body"
 *       description: "Student info"
 *       required: true
 *       schema:
 *         properties:
 *           id:
 *             type: integer
 *             example: 123456789
 *           name:
 *             type: string
 *             example: Bob
 *           major:
 *             type: string
 *             example: MSIT
 */
app.post("/add-student", (req, res) => {
    const data = req.body;
    if (data.id === undefined || !Number.isInteger(data.id)) {
        res.status(400).send("Student Id is required and it should be integer");
        return;
    } else if (data.name === undefined || data.name === "") {
        res.status(400).send("Student Name is required");
        return;
    } else if (data.major === undefined || data.major === "") {
        res.status(400).send("Student Major is required");
        return;
    }
    students.push({
        id: data.id,
        name: data.name,
        major: data.major
    })
    res.status(200).send("Student Added");
})

/**
 * @swagger
 * /student/{id}:
 *   patch:
 *     summary: Update a student
 *     description: Update a student fileds like the "name", "major", and "id".
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Student updated successfully
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student id    
 *       - in: "body"
 *         name: "body"
 *         description: "Student details"
 *         required: true
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *               example: 123456789
 *             name:
 *               type: string
 *               example: Bob
 *             major:
 *               type: string
 *               example: MSIT
 */
app.patch("/student/:id", (req, res) => {
    const studentId = Number.parseInt(req.params.id);
    let student = {};
    let found = false;
    students.forEach(element => {
        if (element.id === studentId) {
            student = element;
            students = students.filter(item => item != element);
            found = true;
            return;
        }
    });
    if (!found) {
        res.status(400).send("Invalid student id");
        return;
    }
    const data = req.body;
    if (data.id != undefined || Number.isInteger(data.id)) {
        student.id = data.id;
    }
    if (data.name != undefined && data.name != "") {
        student.name = data.name;
    }
    if (data.major != undefined && data.major != "") {
        student.major = data.major;
    }
    students.push(student)
    res.status(200).send("Student Updted");
})

/**
 * @swagger
 * /student/{id}:
 *   put:
 *     summary: Update a student
 *     description: Update a student fileds like the "name", "major", and "id".
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Student updated successfully
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student id    
 *       - in: "body"
 *         name: "body"
 *         description: "Student details"
 *         required: true
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *               example: 123456789
 *             name:
 *               type: string
 *               example: Bob
 *             major:
 *               type: string
 *               example: MSIT
 */
app.put("/student/:id", (req, res) => {
    const studentId = Number.parseInt(req.params.id);
    let student = {};
    let found = false;
    students.forEach(element => {
        if (element.id === studentId) {
            student = element;
            students = students.filter(item => item != element);
            found = true;
            return;
        }
    });
    if (!found) {
        res.status(400).send("Invalid student id");
        return;
    }
    const data = req.body;
    if (data.id === undefined || !Number.isInteger(data.id)) {
        students.push(student);
        res.status(400).send("Student Id is required and it should be integer");
        return;
    } else if (data.name === undefined || data.name === "") {
        students.push(student);
        res.status(400).send("Student Name is required");
        return;
    } else if (data.major === undefined || data.major === "") {
        students.push(student);
        res.status(400).send("Student Major is required");
        return;
    }
    student.id = data.id;
    student.name = data.name;
    student.major = data.major;
    students.push(student)
    res.status(200).send("Student Updted");
})


/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Update a student
 *     description: Update a student fileds like the "name", "major", and "id".
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Student updated successfully
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The student id    
 */
app.delete("/student/:id", (req, res) => {
    const studentId = Number.parseInt(req.params.id);
    let student = {};
    let found = false;
    students.forEach(element => {
        if (element.id === studentId) {
            student = element;
            students = students.filter(item => item != element);
            found = true;
            return;
        }
    });
    if (!found) {
        res.status(400).send("Invalid student id");
        return;
    }
    res.status(200).send("Student deleted");
})

app.listen(port, () => {
    console.log("Server is running at ", port);
});