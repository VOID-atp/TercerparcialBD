import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setMessage(data.message);

      // Si el inicio de sesión es exitoso, redirige a /calificaciones
      if (response.ok) {
        window.location.href = "/calificaciones";
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Hubo un error al intentar iniciar sesión");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-6 text-red-600">
          <h1 className="text-2xl font-semibold" style={{color: '#f56565'}}>Inicio de Sesión</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 p-3 block w-full rounded-md bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
            placeholder="Introduce tu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="mt-4 block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 p-3 block w-full rounded-md bg-gray-200 text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500"
            placeholder="Introduce tu Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-6 w-full bg-red-600 text-white p-3 rounded-md focus:outline-none"
            style={{ backgroundColor: "#f56565", transition: "background-color 0.3s" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#e53e3e"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#f56565"}
          >
            Iniciar Sesión
          </button>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          ¿No tienes una cuenta? <a href="/registro" className="text-blue-500">Regístrate</a>
        </p>
      </div>
    </section>
  );
}

export default Login;
