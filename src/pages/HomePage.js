import React from 'react'
import TrendHome from '../components/TrendHome'
import ListMovies from '../components/ListMovies'

function HomePage() {
    return (
        <div>
            <p style={{ color: 'yellow', marginTop: '70px', marginLeft: '10px', fontWeight: '800', fontSize: '40px' }}>POPULAR MOVIES</p>
            <TrendHome />
            <p style={{ color: 'yellow', marginTop: '0px', marginLeft: '10px', fontWeight: '800', fontSize: '40px' }}>MOVIES THEATERS</p>
            <ListMovies />
        </div>
    )
}

export default HomePage