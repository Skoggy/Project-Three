import { createGlobalStyle } from 'styled-components';


const GlobalStyles = createGlobalStyle`

:root {
    --lightBlue: #D5F3FE;
    --white: #fff;
    --lightGrey: #F2F2F2;
    --darkGrey: #4C4C4C;
    --red: #820006;
    --darkRed: #2A0001;
}

 html {
   
    
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
    
 }
`



export default GlobalStyles