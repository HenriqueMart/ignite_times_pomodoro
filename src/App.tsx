import {ThemeProvider} from 'styled-components';

import { defaultTheme  } from './styles/themes/default';
import { GlobalStyle } from './styles/global.js';

import { Router } from './Router.js';
import { BrowserRouter } from 'react-router-dom';
import { CyclesContextProvider } from './Contexts/CyclesContext.js';

export function App() {


  return (

    <ThemeProvider theme={defaultTheme}> 
      <BrowserRouter basename='/ignite_times_pomodoro'>
      <CyclesContextProvider>
        <Router/>
      </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App
