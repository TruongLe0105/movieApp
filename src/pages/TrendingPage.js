import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import apiService from '../app/apiService'
import { API_KEY } from '../app/config'
import BasicPagination from '../components/BasicPagination'
import CardMovie from '../components/CardMovie'

function TrendingPage() {
    const [search, setSearch] = useState([])
    const [countOfPage, setCountOfPage] = useState()
    const [page, setPage] = useState(1)
    const fetchTrending = async () => {
        const { data } = await apiService.get(`/trending/all/day?api_key=${API_KEY}&page=${page}`)

        setSearch(data.results)
        setCountOfPage(data.total_pages)
    }

    useEffect(() => {
        fetchTrending()
    }, [page])

    return (
        <div style={{ position: 'absolute', left: 0 }}>
            <h1 style={{ marginTop: '60px', textAlign: 'center', color: 'green' }}>Trending</h1>
            <Grid container spacing={2} width='100%' >
                {search.map((e) => (
                    <Grid item xs={6} md={4} lg={3} key={e.id}>
                        <CardMovie
                            id={e.id}
                            media_type={e.media_type}
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

export default TrendingPage