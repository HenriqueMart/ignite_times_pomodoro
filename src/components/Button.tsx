import {ButtonContainer, type ButtonVariant} from './Button.style';

interface ButtonProps{
        variant?: ButtonVariant;
}

export function Button({variant = 'primary'}: ButtonProps){
    return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}