import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import apiService from '../../app/apiService';
import { API_KEY, IMAGE, noPicture } from '../../app/config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();


const Carousel = ({ id, media_type }) => {
    const [credits, setCredits] = useState([])
    const fetchCredit = async () => {
        const { data } = await apiService.get(`${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`)

        setCredits(data.cast)
    }

    const items = credits?.map((credit) => (
        <>
            <img key={credit.id} src={credit.profile_path ? `${IMAGE}/${credit.profile_path}` : noPicture}
                alt={credit?.name}
                onDragStart={handleDragStart}
                className='carouselImg'
            />
            <p style={{ color: 'white', fontWeight: '800' }}>{credit?.name}</p>
        </>
    ))

    const reponsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    }

    useEffect(() => {
        fetchCredit()
    }, [])

    return (
        <AliceCarousel
            // animationType='slide'
            autoWidth
            autoPlay
            reponsive={reponsive}
            infinite
            disableDotsControls
            disableButtonsControls
            mouseTracking
            items={items}
        />
    );
}

export default Carousel;