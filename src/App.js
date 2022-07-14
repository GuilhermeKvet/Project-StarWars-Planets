import React from 'react';
import ProviderTable from './context/ProviderTable';
import Table from './components/Table';
import Filters from './components/Filters';

function App() {
  return (
    <ProviderTable>
      <Filters />
      <Table />
    </ProviderTable>
  );
}

export default App;
