import { useState } from "react";

function DepartmentForm({ onCadastrar, departments }) {
  const [name, setName] = useState("");
  const [acronym, setAcronym] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErro("");

    const sigla = acronym.trim().toUpperCase();

    if (!/^[A-Za-z]{2,5}$/.test(sigla)) {
      setErro("A sigla deve ter entre 2 e 5 letras.");
      return;
    }

    const siglaExiste = departments.some(
      (department) => department.acronym.toUpperCase() === sigla
    );

    if (siglaExiste) {
      setErro("Essa sigla já está cadastrada.");
      return;
    }

    if (name.trim() === "") {
      setErro("Digite o nome do departamento.");
      return;
    }

    const departamento = {
      name: name.trim(),
      acronym: sigla
    };

    try {
      setEnviando(true);

      await onCadastrar(departamento);

      setName("");
      setAcronym("");
    } catch (error) {
      setErro("Não foi possível cadastrar o departamento.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="form-section">
      <h2>Cadastrar Departamento</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Departamento</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex: Financeiro"
          />
        </div>

        <div className="form-group">
          <label>Sigla</label>

          <input
            type="text"
            value={acronym}
            onChange={(event) => setAcronym(event.target.value)}
            placeholder="Ex: FIN"
            maxLength="5"
          />
        </div>

        {erro && <p className="error">{erro}</p>}

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Cadastrar Departamento"}
        </button>
      </form>
    </div>
  );
}

export default DepartmentForm;