import React, { useContext, useState } from 'react';
import context from '../context/context';

function Filters() {
  const {
    planets,
    setData,
    setFilterByNumericValues,
  } = useContext(context);
  const [filterInput, setFilterByName] = useState(
    {
      name: '',
      column: 'population',
      comparison: 'maior que',
      value: '0',
    },
  );

  const filterName = (value) => {
    const newData = planets.filter((planet) => {
      if (planet.name.includes(value)) return planet;
      return false;
    });
    setData(newData);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterByName({
      ...filterInput,
      [name]: value,
    });
    if (name === 'name') filterName(value);
  };

  const filterCategory = () => {
    const { comparison, value, column } = filterInput;
    const newData = planets.filter((planet) => {
      if (comparison === 'maior que') {
        return +(planet[column]) > +(value);
      } if (comparison === 'menor que') {
        return +(planet[column]) < +(value);
      }
      return +(planet[column]) === +(value);
    });
    setData(newData);
    setFilterByNumericValues([{
      column: filterInput.column,
      comparison: filterInput.comparison,
      value: filterInput.value,
    }]);
  };

  return (
    <div>
      <label htmlFor="filterByName">
        <input
          type="text"
          id="filterByName"
          data-testid="name-filter"
          onChange={ handleChange }
          name="name"
          value={ filterInput.name }
        />
      </label>
      <label htmlFor="filterByColumn">
        <select
          data-testid="column-filter"
          id="filterByColumn"
          onChange={ handleChange }
          value={ filterInput.column }
          name="column"
        >
          <option value="population" key="1">population</option>
          <option value="orbital_period" key="2">orbital_period</option>
          <option value="diameter" key="3">diameter</option>
          <option value="rotation_period" key="4">rotation_period</option>
          <option value="surface_water" key="5">surface_water</option>
        </select>
      </label>
      <label htmlFor="filterByComparison">
        <select
          data-testid="comparison-filter"
          id="filterByComparison"
          onChange={ handleChange }
          value={ filterInput.comparison }
          name="comparison"
        >
          <option value="maior que" key="1">maior que</option>
          <option value="igual a" key="2">igual a</option>
          <option value="menor que" key="3">menor que</option>
        </select>
      </label>
      <label htmlFor="filterByValue">
        <input
          id="filterByValue"
          data-testid="value-filter"
          type="number"
          onChange={ handleChange }
          value={ filterInput.value }
          name="value"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterCategory }
      >
        FILTRAR
      </button>
    </div>
  );
}

export default Filters;
