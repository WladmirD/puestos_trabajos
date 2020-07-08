import React, { useState, useEffect} from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { config } from '../services/headers';
import './styles/admin-panel.css';
import axios from 'axios';


export default function Admin() {
    const [numPag, setNumPag] = useState();
    const [numPagDB, setNumPagDB] = useState();
    const [categorias,setCategorias] = useState([]);
    const [category, setCategory] = useState();
    const url = 'http://69.55.55.239:8080/api';
    const configSet = config();
    useEffect(() => {
        axios.get(`${url}/pagination`, configSet)
                .then((response) => setNumPagDB(response.data.numPagination))
                .catch((err) => alert(err));
    });
    useEffect(() => {
        axios.get(`${url}/adminCategory`, configSet)
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((err) => alert(err));
        
    },[category, configSet]);
    function handleSubmitNum(event) {
        event.preventDefault();
        const result = { numPagination: numPag}
        axios.put(`${url}/pagination`,result,configSet)
                .then((response) => alert('Ok'))
                .catch((err) => alert(err));
        setNumPag(0);
    }
    function handleSubmitCat(event) {
        event.preventDefault();
        const name = { name: category}
        axios.post(`${url}/category`, name, configSet)
            .then((data) => alert(data.data.message))
            .catch((err) => alert(err.data));
        setCategory("");
    }
    function updateCategory(event) {
        const result = { update: !event.isActive}
        axios.put(`${url}/category/${event.id}`, result,configSet)
            .then((response) => {
                alert('Cambiado correctamente')
            })
            .catch((err) => alert(err.data));
    }
    return (
        <>
        <div className="Admin">
            <form onSubmit={handleSubmitNum}>
                <FormGroup controlId="num" bsSize="small">
                        <ControlLabel>Numero de paginacion:</ControlLabel>
                        <ControlLabel className="num">{numPagDB}</ControlLabel>
                    <FormControl
                        type="number"
                        value={numPag}
                        onChange={e => setNumPag(e.target.value)}
                    />
                    <Button block bsSize="small" type="submit">
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
                                    <tr className="td-state">
                                        <td key={categoria.name}>{categoria.name}</td>
                                        <td key={categoria.isActive.toString()}><Button bsSize="sm"  className={categoria.isActive ? 'table-state primary' : 'table-state danger'} onClick={() => updateCategory(categoria)}>{categoria.isActive.toString()}</Button></td>
                                    </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <form onSubmit={handleSubmitCat}>
                <FormGroup controlId="category" bsSize="small">
                    <ControlLabel>Categoria:</ControlLabel>
                    <FormControl
                        type="text"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                    <Button block bsSize="small" type="submit">
                        Enviar
                    </Button>
                </FormGroup>
            </form>
        </div>
        </>
    )
}