import { Chip } from '@mui/material'
import React, { useEffect } from 'react'
import apiService from '../app/apiService'
import { API_KEY } from '../app/config'

function Genre({
    setPage,
    genre,
    setGenre,
    selectedGenre,
    setSelectedGenre,
    type
}) {
    const handleAdd = (e) => {
        setSelectedGenre([...selectedGenre, e])
        setGenre(genre.filter((g) => g.id !== e.id))
        setPage(1)
    }

    const handleRemove = (e) => {
        setSelectedGenre(selectedGenre.filter((selected) => selected.id !== e.id))
        setGenre([...genre, e])
        setPage(1)
    }

    const fetchGenres = async () => {
        const { data } = await apiService.get(`genre/${type}/list?api_key=${API_KEY}&language=en-US`)
        console.log('data', data);
    }

    useEffect(() => {
        fetchGenres()
        return () => {
            setGenre({})
        }
    }, [])

    return (
        <div style={{ padding: '6px 0' }}>
            {selectedGenre && selectedGenre.map((e) => (
                <Chip key={e.id} label={e.name} style={{ margin: 2 }} size='small' clickable color='primary'
                    onDelete={() => handleRemove(e)}
                />
            ))}

            {genre && genre.map((e) => (
                <Chip key={e.id} label={e.name} style={{ margin: 2, color: 'white' }} size='small' clickable onClick={() => handleAdd(e)} />
            ))}
        </div>
    )
}

export default Genre