import React, { useState, useEffect } from 'react';
import GameForm from '../components/GameForm';
import GamesTable from '../components/GamesTable';
import { getGames, getGenres, getGameById, createGame, updateGame, deleteGame } from '../services/api';

export default function GamesPage() {
    const [games, setGames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [editingGame, setEditingGame] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const fetchedGames = await getGames();
            const fetchedGenres = await getGenres();
            setGames(fetchedGames);
            setGenres(fetchedGenres);
        } catch (error) {
            console.error("Failed to load data", error);
        }
    };

    const handleSaveGame = async (gameData) => {
        try {
            if (editingGame) {
                await updateGame(editingGame.id, gameData);
                setEditingGame(null);
            } else {
                await createGame(gameData);
            }
            await loadData();
        } catch (error) {
            console.error("Failed to save game", error);
        }
    };

    const handleEditClick = async (id) => {
        try {
            const gameDetails = await getGameById(id);
            setEditingGame(gameDetails);
        } catch (error) {
            console.error("Failed to fetch game details", error);
        }
    };

    const handleDeleteClick = async (id) => {
        if (!window.confirm("Are you sure you want to delete this game?")) return;
        
        try {
            await deleteGame(id);
            setGames(games.filter(game => game.id !== id));
        } catch (error) {
            console.error("Failed to delete game", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingGame(null);
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center">Game Store Admin</h1>
            
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <GameForm 
                        genres={genres} 
                        onSave={handleSaveGame} 
                        editingGame={editingGame}
                        onCancel={handleCancelEdit}
                    />
                    
                    <h3 className="mt-5 mb-3">Games Library</h3>
                    <GamesTable 
                        games={games} 
                        onEdit={handleEditClick} 
                        onDelete={handleDeleteClick} 
                    />
                </div>
            </div>
        </div>
    );
}