import { Request, Response } from "express";
import { ClassroomDatabase } from "../database/ClassroomDatabase";
import { StudentDatabase } from "../database/StudentDatabase";
import { Classroom, CLASSROOM_MODULE} from "../models/Classroom";

export class ClassroomController {
    public async getAllClassrooms(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const classroomsDB = await classroomDatabase.getAllClassrooms()

            res.status(200).send({ classrooms: classroomsDB })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }



    public async createClassroom(req: Request, res: Response) {
        let errorCode = 400
        try {
            const name = req.body.name
            const module = req.body.module as CLASSROOM_MODULE
            const students: string[] = []

            if (!name || typeof name !== "string") {
                throw new Error("Parâmetro 'name' faltando ou inválido")
            }

            if (!module || typeof module !== "string") {
                throw new Error("Parâmetro 'module' faltando ou inválido")
            }

            const classroom = new Classroom(
                Date.now().toString(),
                name,
                students,
                module
            )

            const classroomDatabase = new ClassroomDatabase()
            await classroomDatabase.createClassroom(classroom)

            res.status(201).send({ message: "Turma criada", classroom: classroom })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }



    public async getActives(req: Request, res: Response) {
        let errorCode = 400
        try {
            const classroomDatabase = new ClassroomDatabase()
            const classroomsDB = await classroomDatabase.getActiveClassrooms()

            res.status(200).send({ classrooms: classroomsDB })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }



    public async editModule(req: Request, res: Response) {
        let errorCode = 400
        try {
            const id = req.params.id
            const module = req.body.module as CLASSROOM_MODULE

            if (typeof module !== "string") {
                errorCode = 422
                throw new Error("Parâmetro 'module' faltando ou inválido")
            }

            const classroomDatabase = new ClassroomDatabase()
            const classroomDB = await classroomDatabase.findClassroomById(id)

            if (!classroomDB) {
                errorCode = 404
                throw new Error("Id da turma não encontrada")
            }

            const classroom = new Classroom(
                classroomDB.id,
                classroomDB.name,
                [],
                classroomDB.module
            )

            classroom.setModule(module)
            classroomDatabase.updateClassroom(classroom)

            res.status(201).send({ message: "Módulo editado", classroom: classroom })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }

    

    public async getAllStudents(req: Request, res: Response) {
        let errorCode = 400
        try {
            const id = req.params.id

            const classroomDatabase = new ClassroomDatabase()
            const classroomDB = await classroomDatabase.findClassroomById(id)

            if (!classroomDB) {
                errorCode = 404
                throw new Error("Id da turma não encontrada")
            }

            const studentDatabase = new StudentDatabase()
            const students = await studentDatabase.getStudentsByClassroomId(id)

            res.status(201).send({ classroom: classroomDB, students: students })
        } catch (error) {
            res.status(errorCode).send({ message: error.message })
        }
    }
}