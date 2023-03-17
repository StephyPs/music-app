import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';

test("Renders initial state", () => {
  render(
    <Provider store={store}><App /></Provider>
  );
  expect(screen.getByText(/Search for music/i)).toBeInTheDocument();

});
test("Renders loaded state", async () => {
  render(
    <Provider store={store}><App /></Provider>
  );
  const searchText = screen.getByRole("textbox");
  const searchButton = screen.getByRole("button");
  fireEvent.change(searchText, { target: { value: 'next' } })
  fireEvent.click(searchButton);
  const searchTable = await screen.findByTestId("searchResultsTable", {}, { timeout: 5000 })
});