// Importa las dependencias
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Escuela3p");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conectado a la base de datos MongoDB");
});

// Define el esquema del modelo para Alumnos
const alumnoSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});

// Define el modelo para Alumnos
const Alumno = mongoose.model("Alumno", alumnoSchema, "alumnos");

// Define el esquema del modelo para Calificaciones
const calificacionSchema = new mongoose.Schema({
  alumno: String,
  materia: String,
  maestro: String,
  calificacion: Number
});

// Define el modelo para Calificaciones
const Calificacion = mongoose.model("Calificacion", calificacionSchema, "calificaciones");

// Ruta GET para obtener todas las calificaciones
app.get("/calificaciones", async (req, res) => {
  try {
    const calificaciones = await Calificacion.find();
    res.json(calificaciones);
  } catch (error) {
    console.error("Error al obtener calificaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta GET para obtener todas las calificaciones reprobadas
app.get("/calificaciones/reprobadas", async (req, res) => {
  try {
    const calificacionesReprobadas = await Calificacion.find({ calificacion: { $lt: 50 } });
    res.json(calificacionesReprobadas);
  } catch (error) {
    console.error("Error al obtener calificaciones reprobadas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta PUT para actualizar una calificación existente
app.put("/calificaciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCalificacion = await Calificacion.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCalificacion);
  } catch (error) {
    console.error("Error al actualizar calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta POST para agregar una nueva calificación
app.post("/calificaciones", async (req, res) => {
  try {
    const nuevaCalificacion = new Calificacion(req.body);
    await nuevaCalificacion.save();
    res.status(201).json(nuevaCalificacion);
  } catch (error) {
    console.error("Error al agregar calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta DELETE para eliminar una calificación
app.delete("/calificaciones/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Calificacion.findByIdAndDelete(id);
    res.json({ message: "Calificación eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta de inicio de sesión (Login)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const alumno = await Alumno.findOne({ email, password });
    if (alumno) {
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Ruta de registro (Registro)
app.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const nuevoAlumno = new Alumno({ nombre, email, password });
    await nuevoAlumno.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
