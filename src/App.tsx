import {ThemeProvider} from 'styled-components'
import { Button } from './components/Button.js'
import { defaultTheme } from './styles/themes/default.js'
import { GlobalStyle } from './styles/global.js'

export function App() {


  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant='primary'/>
      <Button variant='secondary'/>
      <Button variant='danger'/>
      <Button variant='sucess'/>
      <Button/>
       <GlobalStyle/>
    </ThemeProvider>
  )
}

export default App
