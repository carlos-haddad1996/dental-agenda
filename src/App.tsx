import './App.css';
import { Provider } from 'react-redux';
import store, { history } from './store';
import AppRoutes from './components/routes/appRoutes';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <AppRoutes history={history} />
                    </div>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
};

export default App;
