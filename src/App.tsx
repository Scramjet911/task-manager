import { Provider as ReduxStoreProvider } from 'react-redux';

import store from './redux/store';
import Router from './router';

const App = () => {
  return (
    <ReduxStoreProvider store={store}>
      <Router />
    </ReduxStoreProvider>
  );
};

export default App;
