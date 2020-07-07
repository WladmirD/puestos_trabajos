/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import { Button, ButtonToolbar, SplitButton, MenuItem, FormControl, FormGroup, Radio} from 'react-bootstrap';
import axios from 'axios';
import { config } from '../services/headers';
import './styles/edit-post.css';
const style = {
    title : {
        "fontFamily" : "Open Sans, sans-serif",
        "marginTop" : "10px",
        "fontWeight": 400,
        // "color": '#999'
    },
    spaceBetween : {
        "display" : "flex",
        // "justifyContent": "space-between",
        "alignItems" : "center"
    },
    setWidth : {
        width : "60%",
        height : "74vh"
    },
    width20 : {
        width : "30%",
        margin : "5px"
    },
    width60 : {
        width : "60%",
        margin : "5px"
    },
    top : {
        marginTop : "10px",
        marginLeft: "20px"
    },
    form: {
        padding: "20px",
    }
}
const typeJob = ["Freelance","Part-Time","Full-Time"]
export default function editPost() {
    const { id } = useParams();
    const configHeader = config('multipart/form-data');
    const [categories,setCategories] = useState([]);
    const [cities,setCities] = useState([]);
    const [state , setFormState] = useState({
        category : "",
        type : "",
        url_logo : "",
        address : "",
        posicion : "",
        description : "",
        city : "",
        "Logo": ""
    })
    const getCategory = async () => {
        return await axios.get(`http://69.55.55.239:8080/api/category`)
    }
    const getDataJob = async () => {
        return await axios.get(`http://69.55.55.239:8080/api/jobs/${id}`, configHeader)
    }
    const getCities = async () => {
        return await axios.get(`http://69.55.55.239:8080/api/cities`);
    }
    const watchPhoto = () => {
        window.open(state.url_logo);
    }
    const submitHandler = async () => {
        const {category , type , url_logo , posicion , address , description , city, Logo, owner} = state;
        console.log(state);
        if(category && type && url_logo && posicion && address && description && city){
            const newState = {
                category : "",
                type : "",
                url_logo : "",
                url : "",
                Logo: "",
                posicion : "",
                address : "",
                description : "",
                city : ""
            }
            let formData = new FormData();
            formData.append("posicion" , posicion)
            formData.append("type" , type)
            formData.append("description" , description)
            formData.append("address" , address)
            formData.append("city" , city)
            formData.append("category" , category)
            formData.append("url_logo", url_logo)
            if(Logo) {
                formData.append("image" , Logo)
            }
            formData.append("idOwner", owner.id);
            try{
            const response = await axios.put(`http://69.55.55.239:8080/api/jobs/${id}` , formData, configHeader);
            setFormState({...state , ...newState})
            alert("Job " + (response.data.message || 'Edited'))
            }catch(err){
                alert(err.message);
            }
        }else {
            alert("Please Enter All Fields");
        }
    }
    useEffect(() => {
        getDataJob()
            .then(response => {
                setFormState(response.data);
            })
            .catch(err => {
                alert(err.message || "Error")
            });
        getCategory()
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => alert(err.message || 'Problem with categories'));
        getCities()
            .then(res => {
                setCities(res.data);
            })
            .catch(err => alert(err.message || 'Problem with cities.'));
    },[]);
    return (
        <>
        <div style={style.form}>
            <div>
                <h1 style={style.title}>Edit a Job</h1>
                <div style={style.setWidth}>
                <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            Category
                        </h4>
                        <div style={style.width60}>
                        <ButtonToolbar onChange={(evt) => {
                                    console.log("evt " , evt)
                                }}>
                            <SplitButton
                                bsStyle="default"
                                title={state.category || "Please select Category"}
                                id={`split-button-basic-1}`}
                            >
                                {categories && categories.map(cit => {
                                    return (
                                    <MenuItem key={cit.id} onSelect={(evt) => {
                                        setFormState({...state , category : evt})
                                    }} eventKey={cit.name}>{cit.name}</MenuItem>
                                    )
                                })}
                            </SplitButton>
                        </ButtonToolbar>
                        </div>
                    </div>
                    <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            Cities
                        </h4>
                        <div style={style.width60}>
                        <ButtonToolbar onChange={(evt) => {
                                    console.log("evt " , evt)
                                }}>
                            <SplitButton
                                bsStyle="default"
                                title={state.city || "Please select City"}
                                id={`split-button-basic}`}
                            >
                                {cities && cities.map(cit => {
                                    return (
                                    <MenuItem key={cit.id} onSelect={(evt) => {
                                        setFormState({...state , city : evt})
                                    }} eventKey={cit.name}>{cit.name}</MenuItem>
                                    )
                                })}
                            </SplitButton>
                        </ButtonToolbar>
                        </div>
                    </div>
                    <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            Type
                        </h4>
                        <div style={style.width60}>
                            <FormGroup onChange={(evt) => {
                                    evt.persist();
                                    setFormState({...state , type : evt.target.value})
                                }}>
                                {
                                    typeJob && typeJob.map(type => {
                                        return (
                                            <Radio title={type} value={type} name={type} inline checked={type === state.type}>
                                                {type}
                                            </Radio>
                                        )
                                    })
                                }
                            </FormGroup>
                        </div>
                    </div>
                    <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            Logo
                        </h4>
                        <div style={style.spaceBetween}>
                        <FormControl
                            id="formControlsFile"
                            type="file"
                            label="Logo"
                            accept="image/*"
                            help="Example block-level help text here."
                            onChange={(evt) => {
                                setFormState({...state , Logo : evt.target.files[0]})
                            }}
                            />
                            <Button onClick={() => watchPhoto()} bsSize="small">
                                Ver Foto
                            </Button>
                        </div>
                        <div>
                        </div>
                    </div>
                    {/* <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            url
                        </h4>
                        <div style={style.width60}>
                        <FormControl
                            id="formControlsFile"
                            type="url"
                            label="url"
                            placeholder="Please Enter url"
                            onChange={(evt) => {
                                setFormState({...state , url : evt.target.value})
                            }}
                            />
                        </div>
                    </div> */}
                    <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            Position
                        </h4>
                        <div style={style.width60}>
                        <FormControl
                            id="Position"
                            type="text"
                            label="Position"
                            value={state.posicion}
                            placeholder="Please Enter Position"
                            onChange={(evt) => {
                                setFormState({...state , posicion : evt.target.value})
                            }}
                            />
                        </div>
                    </div>
                    <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            Location
                        </h4>
                        <div style={style.width60}>
                        <FormControl
                            id="Location"
                            type="text"
                            label="Location"
                            placeholder="Please Enter Location"
                            value={state.address}
                            onChange={(evt) => {
                                setFormState({...state , address : evt.target.value})
                            }}
                            />
                        </div>
                    </div>
                    <div style={style.spaceBetween}>
                        <h4 style={style.width20}>
                            Description
                        </h4>
                        <div style={style.width60}>
                        <FormControl
                            id="Description"
                            type="text"
                            label="Description"
                            componentClass="textarea"
                            placeholder="Please Enter Description"
                            value={state.description}
                            onChange={(evt) => {
                                setFormState({...state , description : evt.target.value})
                            }}
                            />
                        </div>
                    </div>
                    <div style={style.top}>
                    <Button bsStyle="primary" onClick={() => submitHandler()}>
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}