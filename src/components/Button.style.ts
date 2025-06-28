import styled, {css} from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'sucess';

interface ButtonContainerProps{
    variant: ButtonVariant;
}

const buttonVariant = {
    primary: 'purple',
    secondary: 'orange',
    danger: 'red',
    sucess: 'green'

}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    width: 100px;
    height: 40px;

    ${prosp => {
        return css `
        background-color: ${buttonVariant[prosp.variant]}`}}
    `