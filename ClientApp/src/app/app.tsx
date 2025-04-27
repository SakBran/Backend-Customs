import { BrowserRouter } from 'react-router-dom';
import AppContext from './components/Context/Context';
import useAuthCheck from './Hooks/useAuthCheck';

export function App() {
  const { template, data, updateData } = useAuthCheck();
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ data, updateData }}>
        {template}
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
