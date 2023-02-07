import React, { useContext, useState } from 'react';
import context from '../context/context';

function Filters() {
  const INICIAL_STATE = {
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: '0',
    order: 'ASC',
    columnOrder: 'population',
  };

  const { planets, data, setName, setData,
    filterByNumericValues, setFilterByNumericValues,
    setOrder, orderPlanets } = useContext(context);

  const [columnsList, setColumnsList] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [bkpColumns] = useState(columnsList);
  const [filterInput, setFilterInput] = useState(INICIAL_STATE);

  const newColumnList = () => {
    const list = columnsList.filter((item) => item !== filterInput.column);
    setColumnsList(list);
    setFilterInput((prevState) => ({ ...prevState, column: list[0] }));
  };

  const checkCondition = (api, comparison, value, column) => {
    const newData = api.filter((planet) => {
      if (comparison === 'maior que') {
        return +(planet[column]) > +(value);
      } if (comparison === 'menor que') {
        return +(planet[column]) < +(value);
      }
      return +(planet[column]) === +(value);
    });
    setData(newData);
  };

  const filterCategory = () => {
    const { comparison, value, column } = filterInput;
    checkCondition(data, comparison, value, column);
    newColumnList();
    setFilterByNumericValues([...filterByNumericValues, {
      column: filterInput.column,
      comparison: filterInput.comparison,
      value: filterInput.value,
      filterPlanets: data,
    }]);
  };

  const removeFilter = () => {
    if (filterByNumericValues.length <= 1) return setData(planets);
    const {
      column,
      comparison,
      value,
      filterPlanets } = filterByNumericValues[filterByNumericValues.length - 2];
    checkCondition(filterPlanets, comparison, value, column);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumnsList(bkpColumns);
    setData(planets);
  };

  const handleChange = ({ target }) => {
    const { name, value, selectedOptions } = target;
    setFilterInput({
      ...filterInput,
      [name]: value,
    });
    if (name === 'columnOrder') {
      setOrder({ column: selectedOptions[0].value, sort: filterInput.order });
    }
    if (value === 'ASC') setOrder({ column: filterInput.columnOrder, sort: value });
    if (value === 'DESC') setOrder({ column: filterInput.columnOrder, sort: value });
    if (name === 'name') setName(value);
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
            <option
              data-testid="optionsColumn"
              value={ column }
              key={ column }
            >
              {column}
            </option>
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
      <div>
        <label htmlFor="selectColumnOrder">
          <select
            id="selectColumnOrder"
            data-testid="column-sort"
            name="columnOrder"
            value={ filterInput.columnOrder }
            onChange={ handleChange }
          >
            {bkpColumns.map((column) => (
              <option
                data-testid="orderColumn"
                value={ column }
                key={ column }
              >
                {column}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="ASC">
          <input
            id="ASC"
            name="order"
            type="radio"
            value="ASC"
            data-testid="column-sort-input-asc"
            onClick={ handleChange }
            defaultChecked
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            id="DESC"
            name="order"
            type="radio"
            value="DESC"
            data-testid="column-sort-input-desc"
            onClick={ handleChange }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => orderPlanets() }
        >
          ORDERNAR
        </button>
      </div>
      <ul>
        {filterByNumericValues && filterByNumericValues.map((filter) => (
          <li key={ Math.random() } data-testid="filter">
            <p>{filter.column}</p>
            <p>{filter.comparison}</p>
            <p>{filter.value}</p>
            <button
              onClick={ () => {
                setFilterByNumericValues(filterByNumericValues
                  .filter((value) => value.column !== filter.column));
                removeFilter();
                setColumnsList((prevState) => [...prevState, filter.column]);
              } }
              type="button"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default Filters;
