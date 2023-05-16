import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import { store } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './localization/i18n';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ReduxProvider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ConfigProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </LocalizationProvider>
  </ReduxProvider>
);
