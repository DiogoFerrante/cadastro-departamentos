import { useEffect, useState } from "react";
import DepartmentForm from "./components/DepartmentForm";
import DepartmentList from "./components/DepartmentList";
import "./App.css";

function App() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar departamentos:", error);
        setLoading(false);
      });
  }, []);

  const cadastrarDepartamento = async (departamento) => {
    const response = await fetch("http://localhost:3000/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(departamento)
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar departamento.");
    }

    const novoDepartamento = await response.json();

    setDepartments((prev) => [...prev, novoDepartamento]);
  };

  return (
    <div className="container">
      <h1>Cadastro de Departamentos</h1>

      <DepartmentForm
        onCadastrar={cadastrarDepartamento}
        departments={departments}
      />

      <DepartmentList
        departments={departments}
        loading={loading}
      />
    </div>
  );
}

export default App;