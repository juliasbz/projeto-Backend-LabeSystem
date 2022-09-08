import { IStudentDB, Student } from "../models/Student"
import { BaseDatabase } from "./BaseDatabase"

export class StudentDatabase extends BaseDatabase {
    public static TABLE_STUDENTS = "Labe_Students"
    public static TABLE_HOBBIES = "Labe_Hobbies"
    public static TABLE_STUDENTS_HOBBIES = "Students_Hobbies"

    public async getAllStudentsDB() {
        const studentsDB: IStudentDB[] = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()

        return studentsDB
    }

    public async createStudent(student: Student, hobbies: string[]) {
        const studentDB: IStudentDB = {
            id: student.getId(),
            name: student.getName(),
            email: student.getEmail(),
            birthdate: student.getBirthdate(),
            classroom_id: student.getClassroomId()
        }

        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .insert(studentDB)
    }

    public async findStudentsByName(name: string) {
        const studentsDB: IStudentDB[] = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
            .where("name", "LIKE", `%${name}%`)

        return studentsDB
    }

    public async findStudentById(id: string) {
        const studentsDB: IStudentDB[] = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
            .where({ id })

        return studentsDB[0]
    }

    public async updateStudent(student: Student) {
        const studentDB: IStudentDB = {
            id: student.getId(),
            name: student.getName(),
            email: student.getEmail(),
            birthdate: student.getBirthdate(),
            classroom_id: student.getClassroomId()
        }

        await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .update(studentDB)
            .where({ id: studentDB.id })
    }

    public async getStudentsByClassroomId(id: string) {
        const studentsDB: IStudentDB[] = await BaseDatabase
            .connection(StudentDatabase.TABLE_STUDENTS)
            .select()
            .where({ classroom_id: id })

        return studentsDB
    }
}