import './styles/App.css'

import Routes from './routes/sections';
import ThemeProvider from './theme';
import AuthProvider from './provider/auth-provider';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
