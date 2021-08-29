import React, { useState } from 'react';
import './App.css';
import Chuck from './chuck.jpg';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function App() {
  const [state, setState] = useState({
    joke: '',
    searchKeyword: '',
    searchUrl: 'https://api.chucknorris.io/jokes/search?query=',
  });

  const fetchRandomData = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random');
    setState({
      ...state,
      joke: result.data.value,
    });
    return result;
  };

  const fetchSearchData = async () => {
    if (state.searchKeyword) {
      const searchResult = await axios.get(
        state.searchUrl + state.searchKeyword
      );
      setState({
        ...state,
        joke:
          searchResult.data.total === 0
            ? 'No Search Results'
            : searchResult.data.result,
      });
      return searchResult;
    }
  };

  const randomFacts = useQuery('randomFacts', fetchRandomData);
  const searchFacts = useQuery('searchFacts', fetchSearchData);

  if (randomFacts.error)
    return <h1>Error {randomFacts.error.message}, please try again</h1>;
  if (randomFacts.isLoading) return <h1>Loading...</h1>;

  if (searchFacts.error)
    return <h1>Error {searchFacts.error.message}, please try again</h1>;
  if (searchFacts.isLoading) return <h1>Loading...</h1>;

  const searchJoke = (event) => {
    setState({
      ...state,
      searchKeyword: event.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="title">Chuck Norris.io API</h1>
          <img src={Chuck} alt="Chuck Norris" />
        </div>

        <div className="col-6 searchJokeCol">
          <div className="card">
            <div className="card-header">Search for a fact</div>
            <div className="card-body">
              <input
                type="text"
                onChange={searchJoke}
                value={state.searchKeyword}
              />
            </div>
          </div>

          <div>
            <button
              onClick={fetchSearchData}
              className="btn btn-warning btn-lg"
            >
              Generate Joke
            </button>
          </div>
        </div>
      </div>

      <h2 className="subTitle">Search Result</h2>
      <h4>
        {typeof state.joke === 'string' ? (
          <p>
            {state.joke}
            <span hidden={state.joke === 'No Search Results'}>
              <Link to={`/details/${randomFacts.data.data.id}`}>
                {' '}
                ...details
              </Link>
            </span>
          </p>
        ) : (
          state.joke.map((_joke) => {
            if (state.joke.length > 10) {
              state.joke.length = 10;
              return (
                <p key={_joke.id} className="fact-item">
                  {_joke.value}
                  <span hidden={state.joke === 'No Search Results'}>
                    <Link to={`/details/${_joke.id}`}> ...details</Link>
                  </span>
                </p>
              );
            }
            return (
              <p key={_joke.id} className="fact-item">
                {_joke.value}
                <span hidden={state.joke === 'No Search Results'}>
                  <Link to={`/details/${_joke.id}`}> ...details</Link>
                </span>
              </p>
            );
          })
        )}
      </h4>
    </div>
  );
}

export default App;
