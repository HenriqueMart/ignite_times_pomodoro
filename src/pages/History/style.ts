import styled from "styled-components";


export const HistoryContainer = styled.main`
    flex: 1;
    padding: 3.5rem;
    display: flex;
    flex-direction: column;

    h1{
        font-size: 1.5rem;
        color: ${props => props.theme['gray-100']}
    }


`;


export const HistoryList = styled.div`
    flex: 1;
    overflow: auto;
    margin-top: 2rem;

    table{
        width: 100%;
        border-collapse: collapse; /*Conta só o valor que foi passado, uma bordar de um elementos 1px, normalmente seria 2px por conta do outro elemento*/
        min-width: 600px;
        th{
            background-color: ${props => props.theme['gray-600']};
            padding: 1rem;
            text-align: left;
            color: ${props => props.theme['gray-100']};
            font-size: 0.875rem;

            &:first-child{
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child{
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }

        td{
            background-color: ${props => props.theme['gray-700']};
            border-top: 4px solid ${props => props.theme['gray-800']};
            padding: 1rem;
            font-size: 0.875rem;
            line-height: 1.6;

            &:first-child{
                width: 50%;
                padding-left: 1.5rem;
            }

            &:last-child{
                padding-right: 1.5rem;
            }
        }
    }

`;

const STATUS_COLORS = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
} as const // Define que sempre será essas string para qualquer utilização, não como possiblidade de qualquer string

interface StatusProps {
    statusColor: keyof typeof STATUS_COLORS; //Pegando a chave do Objeto, passando que será um tipo do objeto
}

export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before{
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]}; /*Permitindo escolher a cor com base na props passada*/
    }
`;