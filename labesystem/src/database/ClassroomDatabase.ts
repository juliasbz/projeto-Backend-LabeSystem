import { Classroom, IClassroomDB } from "../models/Classroom"
import { BaseDatabase } from "./BaseDatabase"

export class ClassroomDatabase extends BaseDatabase {
    public static TABLE_CLASSROOMS = "Labe_Classrooms"

    public async getAllClassrooms() {
        const classroomsDB: IClassroomDB[] = await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .select()

        return classroomsDB
    }

    public async createClassroom(classroom: Classroom) {
        const classroomDB: IClassroomDB = {
            id: classroom.getId(),
            name: classroom.getName(),
            module: classroom.getModule()
        }

        await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .insert(classroomDB)
    }

    public async getActiveClassrooms() {
        const activeClassroomsDB: IClassroomDB[] = await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .select()
            .where("module", ">", "0")

        return activeClassroomsDB
    }

    public async updateClassroom(classroom: Classroom) {
        const classroomDB: IClassroomDB = {
            id: classroom.getId(),
            name: classroom.getName(),
            module: classroom.getModule()
        }

        await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .update(classroomDB)
            .where({ id: classroomDB.id })
    }

    public async findClassroomById(id: string) {
        const classroomsDB: IClassroomDB[] = await BaseDatabase
            .connection(ClassroomDatabase.TABLE_CLASSROOMS)
            .select()
            .where({ id: id })

        return classroomsDB[0]
    }
}
