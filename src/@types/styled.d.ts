import 'styled-components';
import {defaultTheme} from '../styles/themes/default';


/* Permite mostrar todos os atributos que a classe tem em outro classe*/
type ThemeType = typeof defaultTheme;

//Eu estou criando uma tipagem por módulo styled components npm. Não estou criando uma do zero, pois estou importanto lá em cima
//Estou só alterando ou modificando 
declare module 'styled.components'{
    export interface defaultTheme extends ThemeType{}
}