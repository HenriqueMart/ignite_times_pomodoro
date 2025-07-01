import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav{
        display: flex;
        gap: 0.5rem;

        a{
            width: 3rem;
            height: 3rem;

            display: flex;
            justify-content: center;
            align-items: center;

            color: ${props => props.theme['gray-100']};

            border-top: 3px solid transparent; /* Permiti já criar a borda para não sair quando aparecer o hover */
            border-bottom: 3px solid transparent;

            &:hover{ // & para Indicar a propriedade atual animação 
                border-bottom: 3px solid ${props => props.theme['green-500']};
            }

            &.active{
                color: ${props => props.theme['green-500']};
            }
        }
    }

`