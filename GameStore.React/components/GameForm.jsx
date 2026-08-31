import React, { useState, useEffect } from 'react';

export default function GameForm({ genres, onSave, editingGame, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        genreId: '',
        price: '',
        releaseDate: ''
    });

    useEffect(() => {
        if (editingGame) {
            setFormData({
                name: editingGame.name,
                genreId: editingGame.genreId,
                price: editingGame.price,
                releaseDate: editingGame.releaseDate.split('T')[0] 
            });
        } else {
            setFormData({ name: '', genreId: '', price: '', releaseDate: '' });
        }
    }, [editingGame]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const gameDto = {
            name: formData.name,
            genreId: parseInt(formData.genreId, 10),
            price: parseFloat(formData.price),
            releaseDate: formData.releaseDate
        };

        onSave(gameDto);
        setFormData({ name: '', genreId: '', price: '', releaseDate: '' });
    };

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">{editingGame ? 'Edit Game' : 'Add New Game'}</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Genre</label>
                            <select 
                                className="form-select" 
                                name="genreId" 
                                value={formData.genreId} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="" disabled>Select a genre...</option>
                                {genres.map(genre => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                step="0.01" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Release Date</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="releaseDate" 
                                value={formData.releaseDate} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-success me-2">
                            {editingGame ? 'Update Game' : 'Add Game'}
                        </button>
                        {editingGame && (
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}