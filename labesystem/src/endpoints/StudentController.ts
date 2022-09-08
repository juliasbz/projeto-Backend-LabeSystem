import { Request, Response } from "express";
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { StudentDatabase } from "../database/StudentDatabase";
import { Student } from "../models/Student";

export class StudentController {
    public async createStudent(req: Request, res: Response) {
        let errorCode = 400
        try {
            const name = req.body.name
            const email = req.body.email
            const birthdate = req.body.birthdate
            const hobbies = req.body.hobbies as string[]
            const classroomId = req.body.classroomId || null

            if (!name || typeof name !== "string") {
                throw new Error("Parâmetro 'name' faltando ou inválido")
            }

            if (!email || typeof email !== "string") {
                throw new Error("Parâmetro 'email' faltando ou inválido")
            }

            if (!birthdate || typeof birthdate !== "string") {
                throw new Error("Parâmetro 'birthdate' faltando ou inválido")
            }

            if (typeof classroomId !== "string" && classroomId !== null) {
                throw new Error("Parâmetro 'classroomId' inválido")
            }

            const student = new Student(
                Date.now().toString(),
                name,
                email,
                new Date(birthdate),
                classroomId,
                hobbies
            )

            const studentDatabase = new StudentDatabase()
            await studentDatabase.createStudent(student, hobbies)

            res.status(200).send({ message: "Estudante criado", student: student })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }



    public async getStudents(req: Request, res: Response) {
        let errorCode = 400
        try {
            const query = req.query.q

            const studentDatabase = new StudentDatabase()

            if (typeof query === "string") {
                const studentsDB = await studentDatabase.findStudentsByName(query)
                return res.status(200).send({ students: studentsDB })
            }

            const studentsDB = await studentDatabase.getAllStudentsDB()
            
            res.status(200).send({ students: studentsDB })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }


    
    public async editClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const id = req.params.id
            const classroomId = req.body.classroomId

            if (typeof classroomId !== "string" && classroomId !== null) {
                throw new Error("Parâmetro 'classroomId' inválido")
            }

            const classroomDatabase = new ClassroomDatabase()
            const classroom = await classroomDatabase.findClassroomById(classroomId)

            if (!classroom) {
                errorCode = 404
                throw new Error("Id de turma não encontrada")
            }

            const studentDatabase = new StudentDatabase()
            const studentDB = await studentDatabase.findStudentById(id)

            if (!studentDB) {
                errorCode = 404
                throw new Error("Id de estudante não encontrada")
            }

            const student = new Student(
                studentDB.id,
                studentDB.name,
                studentDB.email,
                studentDB.birthdate,
                studentDB.classroom_id,
                []
            )

            student.setClassroomId(classroomId)
            await studentDatabase.updateStudent(student)

            res.status(200).send({ message: "Turma de estudante editada com sucesso" })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}