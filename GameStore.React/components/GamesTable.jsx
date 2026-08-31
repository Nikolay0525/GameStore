import React from 'react';

export default function GamesTable({ games, onEdit, onDelete }) {
    if (games.length === 0) {
        return <div className="alert alert-info">No games available. Add one!</div>;
    }

    return (
        <div className="table-responsive shadow-sm">
            <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Price</th>
                        <th>Release Date</th>
                        <th className="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td className="fw-bold">{game.name}</td>
                            <td>{game.genre}</td>
                            <td>${game.price.toFixed(2)}</td>
                            <td>{new Date(game.releaseDate).toLocaleDateString()}</td>
                            <td className="text-end">
                                <button 
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => onEdit(game.id)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onDelete(game.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}