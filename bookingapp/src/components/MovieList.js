import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('/api/movies');
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/movies/${id}`);
            // Update movie list after deletion
            setMovies(movies.filter(movie => movie._id !== id));
        } catch (error) {
            console.error("Error deleting the movie:", error);
        }
    };

    return (
        <div>
            <h1>Movie List</h1>
            <Link to="/create">Add New Movie</Link>
            <ul>
                {movies.map(movie => (
                    <li key={movie._id}>
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <p>{movie.showtimes}</p>
                        <p>{new Date(movie.releaseDate).toDateString()}</p>
                        <Link to={`/edit/${movie._id}`}>Edit</Link>
                        <button onClick={() => handleDelete(movie._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieList;
