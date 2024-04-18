// app.js (Backend)
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Usa cors

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Escuela3p');
const db = mongoose.connection;

// Definir esquema y modelos para Alumnos, Materias y Calificaciones
const alumnoSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});
const Alumno = mongoose.model('Alumno', alumnoSchema);

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const alumno = await Alumno.findOne({ email, password });
    if (alumno) {
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Registro Route
app.post('/registro', async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const nuevoAlumno = new Alumno({ nombre, email, password });
    await nuevoAlumno.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));