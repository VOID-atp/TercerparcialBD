import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";

function Calificaciones() {
  const [calificaciones, setCalificaciones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    alumno: "",
    materia: "",
    maestro: "",
    calificacion: ""
  });

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        const response = await axios.get("http://localhost:3000/calificaciones");
        setCalificaciones(response.data);
      } catch (error) {
        console.error("Error al obtener calificaciones:", error);
      }
    };

    fetchCalificaciones();
  }, []);

  const handleEditClick = (index) => {
    const selectedCalificacion = calificaciones[index];
    setFormData(selectedCalificacion);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/calificaciones/${formData._id}`, formData);
      setShowForm(false);
    } catch (error) {
      console.error("Error al actualizar calificación:", error);
    }
  };

  const handleAgregarClick = async () => {
    try {
      await axios.post("http://localhost:3000/calificaciones", formData);
      setShowForm(false);
    } catch (error) {
      console.error("Error al agregar calificación:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/calificaciones/${id}`);
      // Filtrar las calificaciones para eliminar la que tiene el ID dado
      setCalificaciones(calificaciones.filter((calificacion) => calificacion._id !== id));
    } catch (error) {
      console.error("Error al eliminar calificación:", error);
    }
  };

  return (
    <div>
      {/* Barra de navegación */}
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Tabla de Calificaciones</span>
          </a>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="calificaciones" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Calificaciones</a>
              </li>
              <li>
                <a href="reprobados" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Reprobados</a>
              </li>
              <li>
                <a href="login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Inicio de Sesión</a>
              </li>
              <li>
                <a href="registro" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Registro</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Tabla de calificaciones */}
      <section className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-blue-900 w-full sm:w-auto mb-8">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-white">
                  Alumno
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Materia
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Maestro
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Calificación
                </th>
                <th scope="col" className="px-6 py-3 text-white">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {calificaciones.map((calificacion, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {calificacion.alumno}
                  </td>
                  <td className="px-6 py-4">
                    {calificacion.materia}
                  </td>
                  <td className="px-6 py-4">
                    {calificacion.maestro}
                  </td>
                  <td className="px-6 py-4">
                    {calificacion.calificacion}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(calificacion._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón para agregar una nueva calificación */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Calificación
        </button>
      </section>

      {/* Formulario para agregar o editar calificación */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800 sm:rounded-lg w-full sm:w-auto">
            <div className="flex justify-between items-center bg-gray-300 dark:bg-gray-700 px-6 py-3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {formData._id ? "Editar Calificación" : "Agregar Calificación"}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Alumno
                  </label>
                  <input
                    type="text"
                    name="alumno"
                    value={formData.alumno}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    placeholder="Nombre del alumno"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Materia
                  </label>
                  <input
                    type="text"
                    name="materia"
                    value={formData.materia}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    placeholder="Nombre de la materia"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Maestro
                  </label>
                  <input
                    type="text"
                    name="maestro"
                    value={formData.maestro}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    placeholder="Nombre del maestro"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2">
                    Calificación
                  </label>
                  <input
                    type="text"
                    name="calificacion"
                    value={formData.calificacion}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200"
                    placeholder="Calificación"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={formData._id ? handleSave : handleAgregarClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {formData._id ? "Guardar" : "Agregar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calificaciones;
