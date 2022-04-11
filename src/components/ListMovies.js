import { useState, useEffect } from 'react';
import apiService from '../app/apiService';
import { API_KEY, IMAGE } from '../app/config';
import { useNavigate } from 'react-router';
import { Grid } from '@mui/material';

export default function ListMovies() {
    const [content, setContent] = useState([])
    const media_type = 'movie'
    const navigate = useNavigate()

    const fetchRate = async () => {
        const { data } = await apiService.get(`/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
        setContent(data.results)
    }

    useEffect(() => {
        fetchRate()
    }, [])

    return (
        <Grid container spacing={1} sx={{ ml: '0px', maxWidth: '100%' }}>
            {content.map((item) => (

                <Grid item key={item.id} xs={6} md={4} lg={3} sx={{}}>
                    <img
                        onClick={() => navigate(`/${media_type}/${item.id}`)}
                        alt={item.title || item.name}
                        src={`${IMAGE}/${item.poster_path}`}
                        style={{ width: '300px', height: '300px' }}
                    />
                </Grid>
            ))}
        </Grid>
    );
}




