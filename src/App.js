import React, { useState, useEffect } from "react";
import api from './services/api.js'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const now = Date.now();
    const response = await api.post('/repositories', {
      title: `repo ${now}`,
      url: `http://${now}`,
      techs: `tech ${now}`
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  function renderItems() {
    return repositories.map(({ id, title }) => {
      return (
        <li key={id}>
          {title}

          <button onClick={() => handleRemoveRepository(id)}>
            Remover
          </button>
        </li>
      );
    })
  }

  useEffect(function () {
    async function getRepositories() {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    }
    getRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {renderItems()}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
