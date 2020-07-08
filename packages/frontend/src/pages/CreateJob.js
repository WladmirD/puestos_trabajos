import React , {useEffect} from "react";
import { Button} from "react-bootstrap"
import {ButtonToolbar , SplitButton , MenuItem , FormControl,FormGroup , Radio} from 'react-bootstrap'
import Layout from '../components/layout';
import axios from "axios";
import {config} from "../services/headers"
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

export default function CreateJob() {
    const configSetForm = config('multipart/form-data')
    const configSet = config();
    const [state , setFormState] = React.useState({
        categories : "",
        category : "",
        type : "",
        Logo : "",
        url : "",
        Position : "",
        Location : "",
        Description : "",
        cities : [],
        city : ""
    })
    const getCategory = async () => {
        return await axios.get(`/api/category`)
    }
    const getCities = async () => {
            return await axios.get(`/api/cities` , configSet)
            // setFormState({...state , cities : responsejob.data})
            // return responsejob
    }
    const submitHandler = async () => {
        const {category , type , Logo , Position , Location , Description , city} = state
        if(category && type && Logo && Position && Location && Description && city){
            const newState = {
                category : "",
                type : "",
                Logo : "",
                url : "",
                Position : "",
                Location : "",
                Description : "",
                city : ""
            }
            let formData = new FormData();
            formData.append("posicion" , Position)
            formData.append("type" , type)
            formData.append("description" , Description)
            formData.append("address" , Location)
            formData.append("city" , city)
            formData.append("category" , category)
            formData.append("image" , Logo)
            try{
            const response = await axios.post("/api/create" , formData ,  configSetForm)
            setFormState({...state , ...newState})
            alert("Job " + (response.data.message || 'created'))
            }catch(err){
                alert(err.message)
            }
        }else {
            alert("Please Enter All Fields");
        }
    }
    useEffect(() => {
        getCategory()
            .then(res => {
                // setFormState({...state , categories : res.data})
                getCities()
                    .then(response => {
                        setFormState({...state , cities : response.data , categories : res.data})
                    })
                    .catch(err => {
                        setFormState({...state , categories : res.data})
                        alert(err.message || "err")
                    })
            })
            .catch(err => {
                alert(err.message || "err")
            })
    })
  return (
    <Layout>
    <div className="CreateJob" style={style.form}>
      <div className="CreateJobForm">
        <h1 style={style.title}>Post a Job</h1>
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
                        {state.categories && state.categories.map(cit => {
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
                        {state.cities && state.cities.map(cit => {
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
                        <Radio title="Freelance" value="Freelance" name="Type" inline>
                            Freelance
                        </Radio>{' '}
                        <Radio title="Part-Time" value="Part-Time" name="Type" inline>
                            Part-Time
                        </Radio>{' '}
                        <Radio title="Full-Time" value="Full-Time" name="Type" inline>
                            Full-Time
                        </Radio>
                    </FormGroup>
                </div>
            </div>
            <div style={style.spaceBetween}>
                <h4 style={style.width20}>
                    Logo
                </h4>
                <div style={style.width60}>
                <FormControl
                    id="formControlsFile"
                    type="file"
                    label="Logo"
                    accept="image/*"
                    help="Example block-level help text here."
                    onChange={(evt) => {
                        console.log("file " , evt.target.files)
                        setFormState({...state , Logo : evt.target.files[0]})
                    }}
                    />
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
                    value={state.Position}
                    placeholder="Please Enter Position"
                    onChange={(evt) => {
                        //console.log("file " , evt.target.files)
                        setFormState({...state , Position : evt.target.value})
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
                    value={state.Location}
                    onChange={(evt) => {
                        setFormState({...state , Location : evt.target.value})
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
                    value={state.Description}
                    onChange={(evt) => {
                        //console.log("file " , evt.target.files)
                        setFormState({...state , Description : evt.target.value})
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
    </Layout>
  );
}