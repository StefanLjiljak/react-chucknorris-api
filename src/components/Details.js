import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

const Details = () => {
  const [state, setState] = useState({
    id: '',
    icon_url: '',
    value: '',
  });

  const { id } = useParams();
  const url = `https://api.chucknorris.io/jokes/${id}`;

  const fetchDetails = async () => {
    const result = await axios(url);
    setState({
      id: result.data.id,
      icon_url: result.data.icon_url,
      value: result.data.value,
    });
    return result;
  };

  const detailsFacts = useQuery('detailsFacts', fetchDetails);

  if (detailsFacts.error)
    return (
      <h1 className="center">
        Error {detailsFacts.error.message}, please try again
      </h1>
    );
  if (detailsFacts.isLoading) return <h1 className="center">Loading...</h1>;

  return (
    <div className="center">
      {state.id === id ? (
        <div>
          <img src={state.icon_url} alt="" />
          <p>{state.value}</p>
        </div>
      ) : (
        <p>No Matching Chuck Norris Fact!</p>
      )}
    </div>
  );
};

export default Details;
