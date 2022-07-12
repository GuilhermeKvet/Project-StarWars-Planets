import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function ProviderTable({ children }) {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const newData = await response.json();
      const newObj = newData.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setData(newObj);
      setPlanets(newObj);
    };
    fetchApi();
  }, []);

  return (
    <context.Provider
      value={ {
        planets,
        data,
        setData,
        filterByNumericValues,
        setFilterByNumericValues,
      } }
    >
      {children}
    </context.Provider>
  );
}

ProviderTable.propTypes = {
  children: PropTypes.objectOf.isRequired,
};

export default ProviderTable;
