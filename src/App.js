import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import axios from "axios";
import { mobile } from "./responsive";
import { dummyData } from "./dummyData.js";
import { AiOutlineSearch } from "react-icons/ai";

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
`;
const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.89),
      rgba(255, 255, 255, 0.15)
    ),
    url("/banner-img.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: sans-serif;
  ${mobile({ height: "50vh" })}
`;

const BannerText = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  font-size: 70px;
  width: 200px;
  color: #fff;
  ${mobile({ fontSize: "30px" })}
`;

const SearchBar = styled.form`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 20px 50px;
  font-size: 20px;
  font-weight: 500;

  button {
    display: none;
  }
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

const MovieContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 300px;
  background-color: #000;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
  text-overflow: ellipsis;
  ${mobile({ width: "150px", height: "250px" })};
  img {
    width: 100%;
    height: 85%;
    border-radius: 10px;
  }
  p {
    width: 100%;
    height: 15%;
    color: #fff;
    padding: 10px 2px;
    justify-self: center;
    font-family: sans-serif;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  input {
    outline: none;
    border: none;
    flex: 0.9;
    flex-grow: 1;
  }

  svg {
    flex: 0.1;
    color: #333;
    font-size: 25px;
  }
`;

const Error = styled.div`
  font-family: sans-serif;
  font-weight: 500;
  font-size: 30px;
  color: #222;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getMovie = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://www.omdbapi.com/?s=${searchText}&apiKey=bb2c5b2c`
      );
      if (res) {
        setMovies(res.data.Search);
      }
    } catch {}
  };

  useEffect(() => {
    setMovies(dummyData);
  }, []);

  return (
    <AppStyled>
      <Header />
      <Banner>
        <BannerText>Watch Something incredible</BannerText>
      </Banner>

      <SearchBar>
        <label>Search</label>
        <InputContainer>
          <input type="text" onChange={(e) => setSearchText(e.target.value)} />
          <AiOutlineSearch onClick={(e) => getMovie(e)} />
        </InputContainer>
      </SearchBar>
      <Body>
        {movies ? (
          movies?.map((movie) => (
            <MovieContainer key={movie.Title}>
              <img src={movie.Poster} alt="" />
              <p>
                {movie.Title}-{movie.Year}
              </p>
            </MovieContainer>
          ))
        ) : (
          <Error>MOVIE NOT FOUND</Error>
        )}
      </Body>
    </AppStyled>
  );
}

export default App;
