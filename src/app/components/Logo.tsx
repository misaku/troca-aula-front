'use client'
import styled, {css} from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    
`
const Content = styled.div`
    display: flex;
    flex: 1;
    gap: 16px;
    font-size: 14px;
    line-height: 22px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    dt {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #509BA1;
        font-weight: bold;
        text-transform: uppercase;
    }

    dd {
        text-align: justify;
        color: #959595;
    }

    input {
        height: 40px;
        width: 100%;
        padding: 5px 10px;
        border-radius: 5px;

        background-color: #336367;
        border: 2px solid #336367;
        color: #fff;
        box-sizing: border-box;

        &:focus {
            outline: none;
            border: 2px solid #6bcdd5;
        }

        &::placeholder {
            color: #6bcdd5;
            text-transform: uppercase;
            opacity: 1; /* Garante visibilidade total, especialmente no Firefox */
        }
    }

    button {
        display: block;
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: none;
        color: #336367;
        text-transform: uppercase;
        cursor: pointer;
        background-color: #fff;
        transition: background-color 0.2s;
        &:hover {
            background-color: #daf3f3;
        }

        &.clear {
            background: transparent;
            height: auto;
            color: #fff;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`
const Card = styled.div`
    display: flex;
    background-color: #fff;
    max-width: 1024px;
    flex-direction: row;
    margin: 20px;
    border-radius: 10px;
    overflow: hidden;
    ${Content}{
        &:nth-child(2){
            background-color: #509BA1;
            max-width: 400px;
        }
    }
`


interface SetaProps {
    inverte?: boolean;
}

const Seta = styled.div<SetaProps>`
    width: 100%;
    height: 3px;
    background-color: #636363;
    position: absolute;
    bottom: 10px;

    &:after {
        content: '';
        display: block;
        width: 10px;
        height: 10px;
        border-top: 3px solid #636363;
        border-right: 3px solid #636363;
        transform: rotate(45deg);
        position: absolute;
        top: -5px;
        right: 0;
    }

    ${({inverte}) => inverte && css`
        background-color: #509BA1;
        bottom: auto;
        top: 10px;

        &:after {
            content: '';
            display: block;
            width: 10px;
            height: 10px;
            border-top: 3px solid #509BA1;
            border-right: 3px solid #509BA1;
            transform: rotate(225deg);
            position: absolute;
            top: -5px;
            left: 0;
        }
    `}
`
const LogoMarca = styled.div`
    display: flex;
    gap: 8px;
    transform: scale(0.7); /* Reduz para 80% do tamanho original */
    transform-origin: center center; /* Define o ponto de origem da transformação */
    h1 {
        color: #509BA1;
        padding: 20px 0;
        position: relative;
        font-size: 30px;
        font-family: sans-serif;
        text-transform: uppercase;
        &:nth-child(1) {

        }

        &:nth-child(2) {
            color: #636363;
        }
    }
`
export default function Logo() {
    return (
        <LogoMarca>
            <h1>
                Troca
                <Seta/>
            </h1>
            <h1><Seta inverte={true}/>
                Aula</h1>
        </Logo>
    );
}
