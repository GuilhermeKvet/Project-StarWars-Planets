import React from 'react';
import { findByRole, render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
};

describe('Testando componente Filter', () => {

  beforeEach(mockFetch);

  test('testa se os inputs estao sendo exibidos', async() => {
    render(<App />);
    const inputFilterName = await screen.findByTestId("name-filter");
    const selectColumn = await screen.findByTestId("column-filter");
    const selectComparison = await screen.findByTestId("comparison-filter");
    const inputFilterValue = await screen.findByTestId("value-filter");
    expect(inputFilterName).toBeInTheDocument();
    expect(selectColumn).toBeInTheDocument();
    expect(selectComparison).toBeInTheDocument();
    expect(inputFilterValue).toBeInTheDocument();  
  });
  test('testa se existe uma tabela', async () => {
    render(<App/>);
    const table = await screen.findByRole("table");
    const th = await screen.findAllByRole("columnheader");
    expect(table).toBeInTheDocument();
    expect(th).toHaveLength(13);
  });
  test('Testa se ao filtrar pelo nome, retorna o resultado esperado', async () => {
    render(<App/>);
    const inputFilterName = await screen.findByTestId("name-filter");
    const td = await screen.findAllByRole("row");
    expect(td).toHaveLength(11);
    userEvent.type(inputFilterName, 'Tatooine');
    expect(inputFilterName.value).toBe('Tatooine');
    const newTd = await screen.findAllByRole("row");
    expect(newTd).toHaveLength(2);
  });
  test('testa se ao selecionar uma opcao de filtro, retorna o valor esperado', async() => {
    render(<App/>);
    const selectColumn = await screen.findByTestId("column-filter");
    const selectComparison = await screen.findByTestId("comparison-filter");
    const inputFilterValue = await screen.findByTestId("value-filter");
    const buttonFilter =  await screen.findByRole("button", { name: /FILTRAR/i });

    userEvent.selectOptions(selectColumn, ['surface_water']);
    userEvent.selectOptions(selectComparison, ['maior que']);
    userEvent.type(inputFilterValue, '5');
    userEvent.click(buttonFilter);
    const tdFilter3 = await screen.findAllByRole("row");
    expect(tdFilter3).toHaveLength(8);
  });
  test('testa se ao fazer uma combinacao de filtros, retorna o resultado esperado', async () => {
    render(<App/>);
    const selectColumn = await screen.findByTestId("column-filter");
    const selectComparison = await screen.findByTestId("comparison-filter");
    const inputFilterValue = await screen.findByTestId("value-filter");
    const buttonFilter =  await screen.findByRole("button", { name: /FILTRAR/i });
    
    userEvent.selectOptions(selectColumn, ['rotation_period']);
    userEvent.selectOptions(selectComparison, ['igual a']);
    userEvent.type(inputFilterValue, '23');
    userEvent.click(buttonFilter);
    const tdFilter1 = await screen.findAllByRole("row");
    expect(tdFilter1).toHaveLength(4);

    userEvent.selectOptions(selectColumn, ['population']);
    userEvent.selectOptions(selectComparison, ['menor que']);
    userEvent.type(inputFilterValue, '0');
    userEvent.click(buttonFilter);
    const tdFilter2 = await screen.findAllByRole("row");
    expect(tdFilter2).toHaveLength(1);
  });
  test("Ao clicar no botao Remover todas as filtragens, retorna a tabela inicial", async() => {
    render(<App/>);
    const selectColumn = await screen.findByTestId("column-filter");
    const selectComparison = await screen.findByTestId("comparison-filter");
    const inputFilterValue = await screen.findByTestId("value-filter");
    const buttonFilter =  await screen.findByRole("button", { name: /FILTRAR/i });
    const buttonRemoveFilters = await screen.findByRole("button", { name: /Remover todas filtragens/i });
    userEvent.selectOptions(selectColumn, ['rotation_period']);
    userEvent.selectOptions(selectComparison, ['igual a']);
    userEvent.type(inputFilterValue, '23');
    userEvent.click(buttonFilter);
    const tdFilter1 = await screen.findAllByRole("row");
    expect(tdFilter1).toHaveLength(4);
    expect(buttonRemoveFilters).toBeInTheDocument();
    userEvent.click(buttonRemoveFilters);
    const tdFilter2 = await screen.findAllByRole("row");
    expect(tdFilter2).toHaveLength(11);
  });
  test('Testa se ao remover um filtro, remove o column utilizado', () => {
    render(<App />);
    const optionPopulationColumn = screen.getAllByTestId("optionsColumn");
    const buttonFilter = screen.getByRole("button", { name: /FILTRAR/i });
    expect(optionPopulationColumn[0]).toBeInTheDocument();
    userEvent.click(buttonFilter);
    const removeFilter = screen.getByRole("button", { name: /x/i });
    expect(removeFilter).toBeInTheDocument();
    userEvent.click(removeFilter);
    expect(optionPopulationColumn[0]).not.toBeInTheDocument();
  });
  test('Testa se os planetas ordenam corretamente', async () => {
    render(<App/>);
    const radioDESC = await screen.findByRole("radio", { name: /DESC/i });
    const radioASC = await screen.findByRole("radio", { name: /ASC/i });
    const buttonOrder = await screen.findByRole("button", { name: /ORDERNAR/i });
    const optionColumnSort = await screen.findAllByTestId("orderColumn");
    expect(radioASC).toBeInTheDocument();
    expect(buttonOrder).toBeInTheDocument();
    expect(optionColumnSort).toHaveLength(5);
    expect(optionColumnSort[3].value).toBe("rotation_period");
    userEvent.click(radioDESC);
    userEvent.click(buttonOrder);
    const planetsName = await screen.findAllByTestId("planet-name");
    expect(planetsName[0]).toHaveTextContent('Coruscant');
    userEvent.click(radioASC);
    userEvent.click(buttonOrder);
    expect(planetsName[0]).toHaveTextContent('Hoth');
  })
})
