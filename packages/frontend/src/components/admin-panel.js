import React, { useState, useEffect} from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './styles/admin-panel.css';
import axios from 'axios';


export default function Admin() {
    const [numPag, setNumPag] = useState();
    const [numPagDB, setNumPagDB] = useState();
    const [categorias,setCategorias] = useState([]);
    const [category, setCategory] = useState();
    const pagination = 'http://69.55.55.239:8080/api/pagination';
    const categoryRQ = 'http://69.55.55.239:8080/api/category';
    const config = {
        headers: {
            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE1OTM5NTUzNjUsImV4cCI6MTU5Mzk1ODk2NX0.0CbLDvzc1j7XTKHqvGNlFBdnoifMl-ItSMgc4xSJw8E',
            'Content-Type': 'application/json'
        }
    }
    function validateForm() {
        return numPag.length > 0 || category.length > 0
    }
    useEffect(() => {
        async function fetchNumPag() {
           const { data:{numPagination}} = await  axios.get(pagination, config);
            setNumPagDB(numPagination);
        }
        fetchNumPag();
    }, [config, pagination]);

    useEffect(() => {
        async function fetchCategory() {
            const { data } = await axios.get(categoryRQ);
            setCategorias(data);
        }
        fetchCategory();
    },[categoryRQ]);
    async function handleSubmitNum(event) {
        event.preventDefault();
        try {
            await axios.put(pagination,{numPagination: numPag}, config);
            alert('Cambiado');
        } catch(err) {
            alert(err.message);
        }
    }
    async function handleSubmitCat(event) {
        event.preventDefault();
        try {
            await axios.post(categoryRQ,{ category}, config);
            alert('Creada la categoria');
        } catch(err) {
            alert(err.message);
        }
    }
    return (
        <>
        <div className="Admin">
            <form onSubmit={handleSubmitNum}>
                <FormGroup bsSize="small">
                        <ControlLabel>Numero de paginacion:</ControlLabel>
                        <ControlLabel className="num">{numPagDB}</ControlLabel>
                    <FormControl
                        type="number"
                        value={numPag}
                        onChange={e => setNumPag(e.target.value)}
                    />
                    <Button block bsSize="small" type="submit" disabled={!validateForm()}>
                        Enviar
                    </Button>
                </FormGroup>
            </form>
            <div className="table-categories">
                <h6 className="line"><span>Categorias</span></h6>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Categoria</th>
                            <th scope="col" className="table-state">estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map((categoria) => {
                                return (
                                    <>
                                    <tr>
                                        <td key={categoria.name}>{categoria.name}</td>
                                        <td key={categoria.isActive.toString()} className="table-state">{categoria.isActive.toString()}</td>
                                    </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmitCat}>
                <FormGroup bsSize="small">
                    <ControlLabel>Categoria:</ControlLabel>
                    <FormControl
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                    <Button block bsSize="small" type="submit" disabled={!validateForm()}>
                        Enviar
                    </Button>
                </FormGroup>
            </form>
        </div>
        </>
    )
}