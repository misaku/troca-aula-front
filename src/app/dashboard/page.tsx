'use client'
import styled from 'styled-components'
import Logo from "@/app/components/Logo";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import { format } from "date-fns";
import * as Yup from 'yup';
const Wrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    width: 100vw;
    height: calc(100vh - 60px);

`
const Container = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    max-width: 1600px;
`
const Content = styled.div`
    display: flex;
    flex: 1;
    gap: 16px;
    align-self: stretch;
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 22px;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    table {
        width: 100%;
        text-align: left;
        border-radius: 5px;
        overflow: hidden;

        thead {
            background-color: #6EC3C9;
        }

        th {
            padding: 10px;
            color: #fff;
            text-transform: uppercase;
        }

        tbody {
            tr:nth-child(even) {
                background-color: #f4f4f4;
            }
        }

        td {
            padding: 10px;
        }

        td:last-child, th:last-child {
            text-align: right;
        }

        button {
            cursor: pointer;
            background-color: #509BA1;
            border: none;
            padding: 5px 10px;
            margin-right: 5px;
            border-radius: 3px;
            color: #fff;
            &:hover{
                background-color: #6EC3C9;
            }
            &:last-child {
                margin-right: 0;
            }
        }
    }
`
const Card = styled.section`

    display: flex;
    max-width: 1600px;
    min-height: calc(100vh - 100px);
    flex-direction: column;
    margin: 20px;
    border-radius: 10px;
    overflow: hidden;

`
const CardContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: #fff;
    gap: 16px;
    border-top-right-radius: 10px;
    button {
        transition: all .3s;
    }
    header {
        display: flex;
        gap: 16px;


    }
    padding: 20px;
`
const Header = styled.header`
    display: flex;
    background-color: #fff;
    width: 100vw;
    height: 60px;
    align-items: center;

`
const Search = styled.div`
    display: flex;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;

    input {
        flex: 1;
        border: none;
        background-color: #f4f4f4;
        padding: 5px 20px;
        outline: none;
    }

    & > button {
        border: none;
        background-color: #509BA1;
        padding: 5px 30px;
        color: #ffffff;
        text-transform: uppercase;
        cursor: pointer;
        &:hover{
            background-color: #6EC3C9;
        }
    }
`
const Form = styled.form`
    display: flex;
    gap: 16px;
    input, select {
        height: 40px;
        background-color: #f4f4f4;
        border: none;
        outline: none;
        border-radius: 5px;
        padding: 5px 20px;
    }
    select {
        position: relative;
        display: grid;
        border-right: 10px solid #f4f4f4;
    }
    & > button {
        cursor: pointer;
        padding: 5px 20px;
        border: none;
        border-radius: 5px;
        background-color: #f4f4f4;
        color: #509BA1;
        text-transform: uppercase;

        &:hover {
            background-color: #cdebed;
        }
    }
`
const TabHeader = styled.div`
    display: flex;
    background-color: #f4f4f4;
    width: 100%;
    height: 60px;

    button {
        border: none;
        background-color: transparent;
        padding: 10px 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-transform: uppercase;
        cursor: pointer;
        color: #989a9a;

        &:hover {
            background-color: #dff4f4;
            color: #509BA1;
        }

        &.active {
            background-color: #fff;
            color: #509BA1;
        }
    }

`
const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: #f4f4f4;
`



export default function Home() {
    const { register, handleSubmit } = useForm();
    const [classes,setClasses] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/classes').then( (data)=> {
            setClasses(data.data)
        })
    }, []);
    return (<>
            <Header>
                <Logo size={60}/>
            </Header>
            <Wrapper>
                <Container>
                    <Card>
                        <TabHeader>
    <button className={'active'}>Aulas Disponiveis</button><button>Minhas Aulas</button>
                        </TabHeader>
                        <CardContent>
                            <Form>
                                <input
                                    {...register("school")}
                                    value={"Otoniel Mota"} disabled={true} type={'text'}/>
                                <select
                                    {...register("subject")}
                                >
                                    <option>Materia</option>
                                </select>
                                <input
                                    {...register("startAt")}
                                    placeholder={'Inicio'} type={'datetime-local'}/>

                                <button>Cadastrar</button>
                            </Form>
                            <Divider />
                            <header>
                                <Search>
                                    <input placeholder={'Pesquisar'} type={'text'}/>
                                    <button>Buscar</button>
                                </Search>
                            </header>

                            <Content>
                                <table cellPadding={0} cellSpacing={0}>
                                    <thead>
                                    <tr>
                                        <th>Materia</th>
                                        <th>Escola</th>
                                        <th>Data Hora</th>
                                        <th>Ações</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {classes.map((item, index) => (
                                        <tr key={`item-${item?.id}`}>
                                            <td>{item?.subject?.name}</td>
                                            <td>{item?.school?.name}</td>
                                            <td>{format(new Date(item?.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                                            <td>
                                                <button>aceitar</button>
                                            </td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </Content>
                        </CardContent>

                    </Card>
                </Container>


            </Wrapper>
        </>

    );
}
