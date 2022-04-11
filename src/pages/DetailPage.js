import { Badge, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import apiService from '../app/apiService'
import { API_KEY, IMAGE1 } from '../app/config'
import { IMAGE } from '../app/config';
import Carousel from '../components/Carousel/Carousel';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './DetailPage.css'

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

        setVideo(data.results[0]?.key)
    }


    const image = `${IMAGE}/${content.poster_path}`
    const date = content.release_date || content.first_air_date

    useEffect(() => {
        fetchIds()
        fetchVideo()
    }, [])

    return (
        <div
            className='container'
        >
            <div
                className='in-container'
            >
                <div
                    className='content-img'
                >
                    <Badge
                        className='image'
                        badgeContent={content.vote_average ? content.vote_average : '0'}
                        color={content.vote_average > 6.5 ? 'primary' : 'secondary'} >
                        <img
                            className='img'
                            src={content.poster_path ? image : IMAGE1}
                            alt={content.title || content.name}
                        ></img>
                    </Badge>
                </div>
                <div
                    className='content-next'
                >
                    <div className='title'>{content.title || content.name}</div>
                    <span className='date-style'>{date}</span>
                    <p className='description'>{content.overview ? content.overview : 'Not Found Content'}</p>
                    <div className='person-image' >
                        <Carousel media_type={params.type} id={params.id} />
                    </div>
                    <Button
                        className='btn'
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