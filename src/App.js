// import React, { useState, useEffect } from "react";
// import apiService from "./app/apiService";
// import { API_KEY } from "./app/config";
// import { Alert, Box, Button, Pagination, Stack } from "@mui/material";
// import { FormProvider, FTextField } from "./components/form";
// import { useForm } from "react-hook-form";

// const defaultValues = {
//     searchQuery: "",
// };

// function App() {
//     const [movies, setMovies] = useState([]);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [page, setPage] = useState(1);
//     const [pageCount, setPageCount] = useState(1);

//     const methods = useForm({
//         defaultValues,
//     });
//     const { handleSubmit } = methods;
//     const onSubmit = (data) => {
//         setSearch(data.searchQuery);
//     };

//     useEffect(() => {
//         const getMovies = async () => {
//             setLoading(true);
//             try {
//                 const response = await apiService.get(
//                     `/discover/movie?api_key=${API_KEY}&page=${page}&year=${search}`
//                 );
//                 setMovies(response.data.results);
//                 setPageCount(response.data.total_pages);
//                 setError("");
//             } catch (error) {
//                 setError(error.message);
//             }
//             setLoading(false);
//         };
//         getMovies();
//     }, [search, page]);

//     return (
//         <div>
//             <h1>Movie DB</h1>
//             {error && <Alert severity="error">{error}</Alert>}
//             <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//                 <Stack direction="row" spacing={2}>
//                     <FTextField name="searchQuery" label="Year" />
//                     <Button type="submit" variant="contained">
//                         Search
//                     </Button>
//                 </Stack>
//             </FormProvider>
//             {loading ? (
//                 <h2>Loading data..</h2>
//             ) : (
//                 <ul>
//                     {movies.map((movie) => (
//                         <li key={movie.id}>{movie.title}</li>
//                     ))}
//                 </ul>
//             )}
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//                 <Pagination
//                     count={pageCount}
//                     page={page}
//                     onChange={(e, value) => setPage(value)}
//                 />
//             </Box>
//         </div>
//     );
// }

// export default App;




import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainHeader from './layout/MainHeader'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import SearchPage from './pages/SearchPage'
import TrendingPage from './pages/TrendingPage'
import TvPage from './pages/TvPage'
import './App.css'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainHeader />}>
                    <Route index element={<HomePage />} />
                    <Route path='/trending' element={<TrendingPage />} />
                    <Route path='/movies' element={<MoviesPage />} />
                    <Route path='/tv' element={<TvPage />} />
                    <Route path='/search' element={<SearchPage />} />
                    <Route path='/:type/:id' element={<DetailPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;