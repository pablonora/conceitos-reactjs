import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
      title: `Project ${Date.now()}`,
      owner: 'Admin',
      techs: ['NodeJS', 'React', 'React Native']
    }

    const result = await api.post('repositories', repository)

    setRepositories([...repositories, result.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    const result = repositories.filter(repository => repository.id !== id)
    
    setRepositories([...result])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
