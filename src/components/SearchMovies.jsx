import { useEffect, useRef, useState } from "react";

function SearchMovies() {
    const [searchMovies, setsearchMovies] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const userKeyword = useRef();
    const apiKey = '3b6e9494';

    const setKeyword = (e) => {
        e.preventDefault();
        setSearchKeyword(userKeyword.current.value);
    }

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?s=${searchKeyword}&apikey=${apiKey}`);
                console.log(response)
                const data = await response.json();
                if (data.Error) {
                    throw new Error("Hubo un error al realizar la petición!!!")
                }
                const moviesUpdate = data.Search;
                setsearchMovies(moviesUpdate);
            } catch (error) {
                console.log(error);
            }
        }
        getMovies();
        return () => {
            setsearchMovies([]);
        };
    }, [searchKeyword, apiKey]);

    return (
        <div className="container-fluid">
            {apiKey !== '' ? (
                <>
                    <div className="row my-4">
                        <div className="col-12 col-md-6">
                            <form method="GET">
                                <div className="form-group">
                                    <label htmlFor="">Buscar por título:</label>
                                    <input ref={userKeyword} type="text" className="form-control" />
                                </div>
                                <button onClick={setKeyword} className="btn btn-info">Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2>Películas para la palabra: {searchKeyword}</h2>
                        </div>
                        {searchMovies && searchMovies.length > 0 && searchMovies.map((movie, i) => (
                            <div className="col-sm-6 col-md-3 my-4" key={i}>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="text-center">
                                            <img
                                                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                                                src={movie.Poster}
                                                alt={movie.Title}
                                                style={{ width: '90%', height: '400px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <p>{movie.Year}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {searchMovies && searchMovies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
                </>
            ) : (
                <div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
            )}
        </div>
    );
}

export default SearchMovies;
