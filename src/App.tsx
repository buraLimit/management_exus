import Routes from 'routes';
import ThemeCustomization from 'themes';
import Snackbar from 'components/@extended/Snackbar';
import { AuthProvider } from 'contexts/AuthContext';

const App = () => (
  <ThemeCustomization>
    <AuthProvider>
      <>
        <Routes />
        <Snackbar />
      </>
    </AuthProvider>
  </ThemeCustomization>
);

export default App;
