import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Outlet, useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search'

export default function MainHeader() {
    const navigate = useNavigate()

    return (
        <>
            <BottomNavigation
                showLabels
                color='primary'
                sx={{
                    backgroundColor: '#263238',
                    position: 'fixed',
                    width: '100vw',
                    zIndex: 900,
                    fontSize: '0px',
                    left: 0,
                    top: 0,
                    borderBottom: '1px solid white',
                    display: 'flex',
                }}>
                <BottomNavigationAction
                    onClick={() => navigate('/')}
                    label="Home"
                    sx={{ color: 'white' }}
                    icon={<HomeIcon fontSize='large' />}
                />
                <BottomNavigationAction
                    onClick={() => navigate('/trending')}
                    label="Trending"
                    style={{ color: 'white' }}
                    icon={<StarBorderPurple500Icon fontSize='large' />}
                />
                <BottomNavigationAction
                    onClick={() => navigate('/movies')}
                    label="Movies"
                    style={{ color: 'white' }}
                    icon={<MovieCreationIcon fontSize='large' />}
                />
                <BottomNavigationAction
                    onClick={() => navigate('/tv')}
                    label="Tv Series"
                    style={{ color: 'white' }}
                    icon={<LiveTvIcon fontSize='large' />}
                />
                <BottomNavigationAction
                    onClick={() => navigate('/search')}
                    label="Search"
                    style={{ color: 'white' }}
                    icon={<SearchIcon fontSize='large' />}
                />
            </BottomNavigation>
            {/* <div style={{
                backgroundColor: 'green',
                height: '2px',
                position: 'absolute',
                width: '40%',
                zIndex: '1000',
                marginTop: '50px',
                textAlign: 'center',
                marginLeft: '30%'
            }} /> */}
            <Outlet />
        </>
    );
}
