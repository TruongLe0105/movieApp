import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Badge, CardActionArea } from '@mui/material';
import { IMAGE, IMAGE1 } from '../app/config';
import { useNavigate } from 'react-router';
import { Box } from '@mui/system';

export default function CardMovie({
    id,
    poster,
    media_type,
    title,
    vote_average,
    date
}) {
    const image = `${IMAGE}/${poster}`
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${media_type}/${id}`)
    }
    return (
        <Badge badgeContent={vote_average ? vote_average : '0'} color={vote_average > 6.5 ? 'primary' : 'secondary'} >
            <Card
                onClick={() => handleClick()}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    backgroundColor: '#4f5b62',
                    borderRadius: 2,
                    ml: 2,
                    maxHeight: '500px',
                    border: '1px solid white',
                }}>
                <CardActionArea>
                    <CardMedia
                        sx={{ borderRadius: '10px', border: '0px solid white', }}
                        component="img"
                        height="400px"
                        image={poster ? image : IMAGE1}
                        alt={title}
                    />
                    <CardContent>
                        <Typography
                            sx={{ fontSize: '0.9rem' }}
                            color='#66ffa6'
                            textAlign='center'
                        >
                            {title.length > 16 ? `${title.slice(0, 16)}...` : title}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',

                            }}
                        >
                            <Typography sx={{ fontSize: '0.7rem' }} color="white">{media_type === 'tv' ? 'Tv Series' : 'Movies'}</Typography>
                            <Typography sx={{ fontSize: '0.7rem' }} color="white">{date}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Badge>
    );
}
