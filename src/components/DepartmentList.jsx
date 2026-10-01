function DepartmentList({ departments, loading }) {
  return (
    <div className="list-section">
      <h2>Lista de Departamentos</h2>

      {loading ? (
        <p className="loading">Carregando departamentos...</p>
      ) : departments.length === 0 ? (
        <p>Nenhum departamento cadastrado.</p>
      ) : (
        <div className="department-list">
          {departments.map((department) => (
            <div className="department-card" key={department.id}>
              <h3>{department.name}</h3>
              <p>
                <strong>Sigla:</strong> {department.acronym}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DepartmentList;