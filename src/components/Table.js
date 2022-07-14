import React, { useContext, useEffect, useState } from 'react';
import context from '../context/context';

function Table() {
  const { data, name } = useContext(context);
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      setHeaders(keys);
    }
  }, [data]);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((value, index) => (
              <th key={ index } cope="col">{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.filter((filter) => filter.name.includes(name))
            .map((values, index) => (
              <tr key={ index }>
                <td data-testid="planet-name">{values.name}</td>
                <td>{values.rotation_period}</td>
                <td>{values.orbital_period}</td>
                <td>{values.diameter}</td>
                <td>{values.climate}</td>
                <td>{values.gravity}</td>
                <td>{values.terrain}</td>
                <td>{values.surface_water}</td>
                <td>{values.population}</td>
                <td>{values.films}</td>
                <td>{values.created}</td>
                <td>{values.edited}</td>
                <td>{values.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
