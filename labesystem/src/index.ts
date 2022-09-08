import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { StudentController } from './endpoints/StudentController'
import { ClassroomController } from './endpoints/ClassroomController'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

const studentController = new StudentController()
const classroomController = new ClassroomController()

// 0) Buscar todas turmas
app.get("/classrooms", classroomController.getAllClassrooms)

// 1) Criar turma
app.post("/classrooms", classroomController.createClassroom)

// 2) Buscar turmas ativas
app.get("/classrooms/active", classroomController.getActives)

// 3) Mudar turmas de módulo
app.put("/classrooms/:id/module", classroomController.editModule)

// 4) Criar estudante
app.post("/students", studentController.createStudent)

// 5) Buscar estudante por nome
app.get("/students", studentController.getStudents)

// 6) Editar turma de estudante
app.put("/students/:id/classroom", studentController.editClassroom)

// 7) Buscar todas pessoas de uma turma
app.get("/classrooms/:id/students", classroomController.getAllStudents)