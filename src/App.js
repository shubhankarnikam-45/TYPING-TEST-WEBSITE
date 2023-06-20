import { GlobalStyles } from "./Styles/global";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Constext/themeContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {
  const { theme } = useTheme();
  return (

    <ThemeProvider theme={theme}>
      <div className="App">
        <ToastContainer />
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/user' element={<UserPage />} />
        </Routes>
      </div>
    </ThemeProvider>

  );
}

export default App;
