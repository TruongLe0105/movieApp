import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiService from '../app/apiService'
import { API_KEY } from '../app/config'
import BasicPagination from '../components/BasicPagination'
import CardMovie from '../components/CardMovie'
import Genre from '../components/Genre'
import useGenres from '../hooks/useGenre'



function MoviesPage() {
    const [page, setPage] = useState(1)
    const [selectedGenre, setSelectedGenre] = useState([])
    const [genre, setGenre] = useState([])
    const [countOfPage, setcountOfPage] = useState()
    const [search, setSearch] = useState([])
    const genreForURL = useGenres(selectedGenre)

    const fetchMovies = async () => {
        const { data } = await apiService.get(`/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`)

        setSearch(data.results)
        setcountOfPage(data.total_pages)
    }

    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, genreForURL])

    return (
        <div style={{ position: 'absolute', left: 0 }}>
            <h1 style={{ marginTop: '60px', textAlign: 'center', color: 'green' }}>TV Series</h1>
            <Genre
                type='tv'
                genre={genre}
                setPage={setPage}
                selectedGenre={selectedGenre}
                setGenre={setGenre}
                setSelectedGenre={setSelectedGenre}
            />
            <Grid container spacing={2} width='100%' >
                {search.map((e) => (
                    <Grid item xs={6} md={4} lg={3} key={e.id}>
                        <CardMovie
                            id={e.id}
                            media_type='tv'
                            title={e.title || e.name}
                            vote_average={e.vote_average}
                            poster={e.poster_path}
                            date={e.release_date || e.first_air_date}
                        />
                    </Grid>
                ))}
            </Grid>
            <BasicPagination setPage={setPage} countOfPage={countOfPage} />
        </div>
    )
}

export default MoviesPage