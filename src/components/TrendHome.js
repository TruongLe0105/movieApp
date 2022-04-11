import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useNavigate } from 'react-router';
import apiService from '../app/apiService';
import { API_KEY, IMAGE, noPicture } from '../app/config';

const handleDragStart = (e) => e.preventDefault();


const TrendHome = () => {
    const [trending, setTrending] = useState([])
    const navigate = useNavigate()

    const fetchTrend = async () => {
        const { data } = await apiService.get(`/trending/all/day?api_key=${API_KEY}&page=1`)

        setTrending(data.results)
    }


    const items = trending?.map((trend) => (
        <div key={trend.id} style={{ width: '300px', marginLeft: '10px' }}>
            <img onClick={() => navigate(`/${trend.media_type}/${trend.id}`)} src={trend.poster_path ? `${IMAGE}/${trend.poster_path}` : noPicture}
                alt={trend?.name}
                onDragStart={handleDragStart}
                style={{
                    height: '300px',
                    width: '250px',
                }}
            />
            <p style={{ color: 'white', fontWeight: '600', textAlign: 'left' }}>{trend?.name || trend?.title}</p>
        </div>
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
        fetchTrend()
    }, [])

    return (
        <AliceCarousel
            animationType='slide'
            autoWidth
            reponsive={reponsive}
            infinite
            disableDotsControls
            mouseTracking
            items={items}
        />
    );
}

export default TrendHome;