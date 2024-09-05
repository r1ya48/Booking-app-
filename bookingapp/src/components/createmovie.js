// src/components/CreateMovie.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateMovie = () => {
    const [movie, setMovie] = useState({
        title: '',
        description: '',
        showtimes: '',
        releaseDate: '',
    });

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/movies', movie);
            console.log('Movie created:', response.data);
        } catch (error) {
            console.error('Error creating movie:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Movie Title"
                value={movie.title}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={movie.description}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="showtimes"
                placeholder="Showtimes"
                value={movie.showtimes}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="releaseDate"
                value={movie.releaseDate}
                onChange={handleChange}
                required
            />
            <button type="submit">Create Movie</button>
        </form>
    );
};

export default CreateMovie