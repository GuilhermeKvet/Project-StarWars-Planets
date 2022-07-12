import React, { useContext, useEffect, useState } from 'react';
import context from '../context/context';

function Table() {
  const { data } = useContext(context);
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
          {data.length > 0 && data.map((values, index) => (
            <tr key={ index }>
              {Object.values(values).map((value) => (
                <td key={ Math.random() }>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
