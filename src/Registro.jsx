import React, { useState } from "react";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data.message); // Muestra el mensaje de respuesta

      // Redirige al usuario al inicio de sesión después del registro
      window.location.href = "/login";
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6 text-red-600">
          <h1 className="text-2xl font-semibold" style={{color: '#f56565'}}>Registrar</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="mt-1 p-3 block w-full rounded-md bg-gray-200 text-gray-800 border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500"
            placeholder="Introduce tu Nombre"
            required
          />
          <label htmlFor="email" className="mt-4 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-3 block w-full rounded-md bg-gray-200 text-gray-800 border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500"
            placeholder="Introduce tu Email"
            required
          />
          <label htmlFor="password" className="mt-4 block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-3 block w-full rounded-md bg-gray-200 text-gray-800 border border-gray-300 focus:border-red-500 focus:ring focus:ring-red-500"
            placeholder="Introduce tu Contraseña"
            required
          />
          <button
            type="submit"
            className="mt-6 w-full bg-red-600 text-white p-3 rounded-md focus:outline-none"
            style={{ backgroundColor: "#f56565", transition: "background-color 0.3s" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#e53e3e"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#f56565"}
          >
            Registrar
          </button>
          <p className="mt-8 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta? <a href="/login" className="text-blue-500">Inicia Sesión</a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Registro;
