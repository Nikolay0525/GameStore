// Base URL uses the proxy configured in Vite
const API_BASE = '/api';

export const getGames = async () => {
    const response = await fetch(`${API_BASE}/games`);
    return response.json();
};

export const getGameById = async (id) => {
    const response = await fetch(`${API_BASE}/games/${id}`);
    return response.json();
};

export const getGenres = async () => {
    const response = await fetch(`${API_BASE}/genres`);
    return response.json();
};

export const createGame = async (gameData) => {
    const response = await fetch(`${API_BASE}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
    });
    return response.json();
};

export const updateGame = async (id, gameData) => {
    await fetch(`${API_BASE}/games/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
    });
};

export const deleteGame = async (id) => {
    await fetch(`${API_BASE}/games/${id}`, {
        method: 'DELETE'
    });
};