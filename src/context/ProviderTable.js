import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

const ONE_LESS = -1;

function ProviderTable({ children }) {
  const [planets, setPlanets] = useState([]);
  const [data, setData] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [name, setName] = useState('');

  const fetchApi = async () => {
    const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const newData = await response.json();
    const newObj = newData.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
    setData(newObj);
    setPlanets(newObj.sort((a, b) => (a.name > b.name ? 1 : ONE_LESS)));
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const orderListSort = (conditionOne, conditionTwo) => {
    const { column } = order;
    const orderedPlanets = planets.sort((a, b) => {
      if (+(a[column]) > +(b[column])) return conditionOne;
      if (+(a[column]) < +(b[column])) return conditionTwo;
      if (a[column] === 'unknown') return conditionTwo;
      if (b[column] === 'unknown') return conditionOne;
      return false;
    });
    setPlanets(orderedPlanets);
    setFilterByNumericValues([...filterByNumericValues]);
  };

  const orderPlanets = () => {
    if (order.sort === 'ASC') {
      orderListSort(1, ONE_LESS);
    }
    if (order.sort === 'DESC') {
      orderListSort(ONE_LESS, 1);
    }
  };

  return (
    <context.Provider
      value={ {
        planets,
        data,
        name,
        filterByNumericValues,
        setData,
        setName,
        setFilterByNumericValues,
        setOrder,
        orderPlanets,
      } }
    >
      {children}
    </context.Provider>
  );
}

ProviderTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderTable;
