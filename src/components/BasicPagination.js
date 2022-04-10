import { Pagination } from '@mui/material'
import React from 'react'

function BasicPagination({ setPage, countOfPage }) {
    const handleChange = (page) => {
        setPage(page)
    }


    return (
        <div style={{
            marginBottom: '10px',
            display: 'flex',
            justifyContent: 'flex-end',
        }}>
            <Pagination
                shape="rounded" count={countOfPage}
                onChange={(e) => handleChange(e.target.textContent)}
                sx={{
                    mt: 1,
                }}
                color='primary'
                hideNextButton
                hidePrevButton
            />
        </div>
    )
}

export default BasicPagination