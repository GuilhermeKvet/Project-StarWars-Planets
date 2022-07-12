import React, { useContext, useState } from 'react';
import context from '../context/context';

function Filters() {
  const {
    planets,
    data,
    setData,
    // filterByNumericValues,
    // setFilterByNumericValues,
  } = useContext(context);

  const [columnsList, setColumnsList] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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

  const newColumnList = () => {
    const { column } = filterInput;
    const list = columnsList.filter((item) => item !== column);
    setColumnsList(list);
    setFilterByName((prevState) => ({ ...prevState, column: list[0] }));
  };

  const filterCategory = () => {
    const { comparison, value, column } = filterInput;
    const newData = data.filter((planet) => {
      if (comparison === 'maior que') {
        return +(planet[column]) > +(value);
      } if (comparison === 'menor que') {
        return +(planet[column]) < +(value);
      }
      if (comparison === 'igual a') {
        return +(planet[column]) === +(value);
      }
      return false;
    });
    setData(newData);
    newColumnList();
    // setFilterByNumericValues([...filterByNumericValues, {
    //   column: filterInput.column,
    //   comparison: filterInput.comparison,
    //   value: filterInput.value,
    // }]);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterByName({
      ...filterInput,
      [name]: value,
    });
    if (name === 'name') filterName(value);
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
          {columnsList.map((column) => (
            <option value={ column } key="1">{column}</option>
          ))}
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
