export enum CLASSROOM_MODULE {
    "ZERO" = "0",
    "ONE" = "1",
    "TWO" = "2",
    "THREE" = "3",
    "FOUR" = "4",
    "FIVE" = "5",
    "SIX" = "6"
}

export interface IClassroomDB {
    id: string,
    name: string,
    module: CLASSROOM_MODULE
}

export class Classroom {
    constructor(
        private id: string,
        private name: string,
        private students: string[],
        private module: CLASSROOM_MODULE
    ) {}

    public getId() {
        return this.id
    }

    public getName() {
        return this.name
    }

    public getStudents() {
        return this.students
    }

    public getModule() {
        return this.module
    }

    public setId(newId: string) {
        this.id = newId
    }

    public setName(newName: string) {
        this.name = newName
    }

    public setStudents(newStudents: string[]) {
        this.students = [...newStudents]
    }

    public setModule(newModule: CLASSROOM_MODULE) {
        this.module = newModule
    }
}