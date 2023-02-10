import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.scss';
import CpfPopUp from './CpfPopUp';
import { AxiosError } from 'axios';

const App = () => {
  const [cpfs, setCpfs] = useState([]);
  const [newCpf, setNewCpf] = useState('');
  const [searchCpf, setSearchCpf] = useState('');
  const [error, setError] = useState('');
  const [cpfPopUp, setCpfPopUp] = useState({
    cpf: '',
    createdAt: '',
  });
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      const result = await api.get('/cpf');
      setCpfs(result.data);
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCpf = async () => {
    try {
      await api.post('/cpf', { cpf: newCpf });
      setNewCpf('');
      setError('');
      await fetchData();
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  const handleDeleteCpf = async (cpf) => {
    try {
      await api.delete(`/cpf/${cpf}`);
      setError('');
      await fetchData();
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  const handleSearchCpf = async (cpf) => {
    if (cpf === '') {
      setError('Please enter a CPF');
      return;
    }
    try {
      const result = await api.get(`/cpf/${cpf}`);
      setCpfPopUp(result.data);
      setOpen(true);
      setSearchCpf('');
      setError('');
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        setError(err.response.data.message);
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="app">
      <CpfPopUp cpfPopUp={cpfPopUp} open={open} setOpen={setOpen} />
      <h1 className="app-title">Search CPF</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchCpf(searchCpf);
        }}
        className="search-cpf-form"
      >
        <input
          type="text"
          value={searchCpf}
          onChange={(e) => setSearchCpf(e.target.value)}
          className="input"
        />
        <button type="submit" className="search-button">
          Search CPF
        </button>
      </form>
      <hr className="divider" />
      <h1 className="app-title">Add CPF</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCpf();
        }}
        className="add-cpf-form"
      >
        <input
          type="text"
          value={newCpf}
          onChange={(e) => setNewCpf(e.target.value)}
          className="input"
        />
        <button type="submit" className="add-button">
          Add CPF
        </button>
      </form>
      <hr className="divider" />
      <p className="error">{error}</p>
      <h1 className="app-title">CPF List</h1>
      <ul className="cpf-list">
        {cpfs.map(({ cpf, createdAt }) => (
          <li
            key={cpf}
            className="cpf-item"
            onClick={(e) => {
              e.stopPropagation();
              setCpfPopUp({ cpf, createdAt });
              setOpen(true);
            }}
          >
            {cpf}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const confirm = window.confirm(
                  'Are you sure you want to delete this CPF?',
                );
                if (confirm) {
                  handleDeleteCpf(cpf);
                }
              }}
              className="delete-button"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
