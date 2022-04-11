import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import apiService from '../app/apiService';
import { API_KEY, IMAGE } from '../app/config';
import { useNavigate } from 'react-router';
import { Grid } from '@mui/material';

// function srcset(image, size, rows = 1, cols = 1) {

//     return {
//         src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//         srcSet: `${image}?w=${size * cols}&h=${size * rows
//             }&fit=crop&auto=format&dpr=2 2x`,
//     };
// }

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

        // <ImageList
        //     sx={{ ml: '20px', width: '98%', height: 800 }}
        //     variant="quilted"
        //     cols={4}
        //     rowHeight={160}
        // >
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
        // </ImageList>
    );
}




