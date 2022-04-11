import { Badge, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import apiService from '../app/apiService'
import { API_KEY, IMAGE1 } from '../app/config'
import { IMAGE } from '../app/config';
import Carousel from '../components/Carousel/Carousel';
import YouTubeIcon from '@mui/icons-material/YouTube';

function DetailPage() {
    const [content, setContent] = useState([])
    const [video, setVideo] = useState()
    const params = useParams()

    const fetchIds = async () => {
        const { data } = await apiService.get(`/${params.type}/${params.id}?api_key=${API_KEY}&language=en-US`)

        setContent(data)
    }
    const fetchVideo = async () => {
        const { data } = await apiService.get(`/${params.type}/${params.id}/videos?api_key=${API_KEY}&language=en-US`)

        // console.log(data.results);   
        setVideo(data.results[0]?.key)
    }


    const image = `${IMAGE}/${content.poster_path}`
    const date = content.release_date || content.first_air_date

    useEffect(() => {
        fetchIds()
        fetchVideo()
    }, [params])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '97vh'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    backgroundColor: '#3d4042',
                    marginTop: '70px',
                    width: '95%',
                    height: '90%',
                    borderRadius: '15px',
                    border: '2px solid white',
                }}
            >
                <div
                    style={{
                        margin: '10px',
                        height: '83vh',
                    }}>
                    <Badge
                        sx={{ height: '100%' }}
                        badgeContent={content.vote_average ? content.vote_average : '0'}
                        color={content.vote_average > 6.5 ? 'primary' : 'secondary'} >
                        <img
                            height='100%'
                            src={content.poster_path ? image : IMAGE1}
                        />
                    </Badge>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '68%',
                        marginLeft: '10px',
                    }}
                >
                    <div style={{ color: 'white', fontSize: '45px', fontStyle: 'italic' }}>{content.title || content.name}</div>
                    <span style={{ color: 'yellow', fontSize: '25px', marginLeft: '150px', marginTop: 0, }}>{date}</span>
                    <p style={{
                        color: '#fff', fontSize: '15px', borderRadius: '10px', border: '1px solid black', padding: '10px', textAlign: 'center',
                        boxShadow: '1px -1px 15px 5px #000000'
                    }}>{content.overview ? content.overview : 'Not Found Content'}</p>
                    <div style={{ width: '100%', height: '50%', marginTop: '10px' }}>
                        <Carousel media_type={params.type} id={params.id} />
                    </div>
                    <Button
                        sx={{ mb: 3, fontSize: '20px' }}
                        variant='contained'
                        startIcon={<YouTubeIcon />}
                        color='primary'
                        target='_blank'
                        href={`https://www.youtube.com/watch?v=${video}`}>
                        Watch the trailer
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default DetailPage