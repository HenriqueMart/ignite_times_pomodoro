import {ThemeProvider} from 'styled-components';

import { defaultTheme } from './styles/themes/default.js';
import { GlobalStyle } from './styles/global.js';

import { Router } from './Router.js';
import { BrowserRouter } from 'react-router-dom';

export function App() {


  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
      <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App
