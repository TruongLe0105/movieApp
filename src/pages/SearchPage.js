import SearchIcon from '@mui/icons-material/Search'
import { Button, Grid, Tab, Tabs, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import apiService from '../app/apiService'
import { API_KEY } from '../app/config'
import BasicPagination from '../components/BasicPagination'
import CardMovie from '../components/CardMovie'

function SearchPage() {
    const [type, setType] = useState(0)
    const [page, setPage] = useState(1)
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState([])
    const [countOfPage, setCountOfPage] = useState(1)

    const fetchSearch = async () => {
        const { data } = await apiService.get(`/search/${type ? 'tv' : 'movie'}?api_key=${API_KEY}&language=en-US&query=${searchText ? searchText : type}&page=${page}&include_adult=false`)

        setSearch(data.results)
        setCountOfPage(data.total_pages)
        // setSearchText('')
    }

    useEffect(() => {
        fetchSearch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, type])

    return (
        <div style={{ position: 'absolute', left: 0, right: 0, height: '100%' }}>
            <h1 style={{ marginTop: '60px', textAlign: 'center', color: 'green' }}>Search</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '16px 5px',
            }}>

                <TextField label="Search" color="primary" focused
                    autoComplete='off'
                    sx={{ width: '40%', mr: '10px' }}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant='contained'
                    color='success'
                    onClick={fetchSearch}
                >
                    <SearchIcon />
                </Button>

            </div>
            <Tabs
                sx={{ mb: 2 }}
                value={type}
                indicatorColor='primary'
                variant="fullWidth"
                onChange={(event, newValue) => {
                    setType(newValue)
                    setPage(1)
                }}
            >
                <Tab label='Search Moviex' />
                <Tab label='Search TV Series' />
            </Tabs>
            <Grid container spacing={2} width='100%' >
                {search.map((e) => (
                    <Grid item xs={6} md={4} lg={3} key={e.id}>
                        <CardMovie
                            id={e.id}
                            media_type={type ? 'tv' : 'movie'}
                            title={e.title || e.name}
                            vote_average={e.vote_average}
                            poster={e.poster_path}
                            date={e.release_date || e.first_air_date}
                        />
                    </Grid>
                ))}
                {searchText && !search &&
                    (type ? 'Tv Series not found' : 'Movies not found')
                }
            </Grid>
            {countOfPage > 1 &&
                <BasicPagination setPage={setPage} countOfPage={countOfPage} />
            }
        </div>
    )
}

export default SearchPage