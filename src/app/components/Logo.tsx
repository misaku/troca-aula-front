'use client'
import styled, {css} from 'styled-components'

interface SetaProps {
    type?: string;
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

    ${({type}) => type==='inverse' && css`
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
 /* Reduz para 80% do tamanho original */
    transform-origin: center center; /* Define o ponto de origem da transformação */
    position: relative;
    h1 {
        color: #509BA1;
        padding: 20px 0;
        position: relative;
        font-size: 30px;
        line-height: 30px;
        font-family: sans-serif;
        text-transform: uppercase;
        &:nth-child(2) {
            color: #636363;
        }
    }
`
interface LogoMarcaWrapperProps{
    percent?: number;
}
const LogoMarcaWrapper = styled.div<LogoMarcaWrapperProps>`
    transform: scale(1); 
    ${props => props?.percent && props?.percent > 0 && css`
        transform: scale(${props.percent});
    `}
   
`

export default function Logo({size = 100}) {
    return (<LogoMarcaWrapper percent={size / 100}>
        <LogoMarca>
            <h1>
                Troca
                <Seta/>
            </h1>
            <h1><Seta type={'inverse'}/>
                Aula</h1>
        </LogoMarca>
    </LogoMarcaWrapper>

    );
}
