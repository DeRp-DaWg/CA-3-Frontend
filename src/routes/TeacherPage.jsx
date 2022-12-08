import React, { useState,useEffect } from "react"
import facade from "../fetchers/apiFacade";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, NavLink, } from 'react-router-dom'

export function ChangePass(){

  const [newPassword, setNewPassword] = useState("");
  const [formType, setFormType] = useState("password");

  const changeType = () => {

    setFormType()
  }

  const performChange = (evt) => {
    evt.preventDefault();
    // viewPass(false);
    facade.updatePassword(newPassword);
    console.log(newPassword);
    // Insert so it updates password, on db
  }

  const onChange = (evt) => {
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setNewPassword(evt.target.value);
  }

  return(
    <>
      <Container fluid="xxl">
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>New password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"/>
          </Form.Group>
          <Button onClick={performChange} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function AddTopic(){
  
  const initTopic = {
    name: "",
    description: "",
    example: "",
    formula: "",
    calculatorURL: "",
    calcName: "",
    tags: "",
    keyword: "",
    calcFormula: "",
    isSingleInput: false
  }
  const [newTopic, setNewTopic] = useState(initTopic);

  const performAdd = (evt) => {
    evt.preventDefault();
    // viewTopic(false);
    facade.createTopic(newTopic.name, newTopic.description, newTopic.example,
      newTopic.formula, newTopic.calculatorURL, newTopic.calcName, [newTopic.tags],
      newTopic.keyword, newTopic.calcFormula, newTopic.isSingleInput);
    console.log(newTopic);
  }

  const onChange = (evt) => {
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setNewTopic({...newTopic,[evt.target.id]: value});
  }

  return(
    <>
      <Container fluid="xxl">
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Add name</Form.Label>
            <Form.Control type="text" placeholder="Name"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Add description</Form.Label>
            <Form.Control type="text" placeholder="Description"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="example">
            <Form.Label>Add example</Form.Label>
            <Form.Control type="text" placeholder="Example"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formula">
            <Form.Label>Add formula</Form.Label>
            <Form.Control type="text" placeholder="Formula"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="calculatorURL">
            <Form.Label>Add calculator URL</Form.Label>
            <Form.Control type="text" placeholder="Calc URL"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="calcName">
            <Form.Label>Add calculator name</Form.Label>
            <Form.Control type="text" placeholder="Calc name"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Add tag</Form.Label>
            <Form.Control type="text" placeholder="Calc tag"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="keyword">
            <Form.Label>Add keyword</Form.Label>
            <Form.Control type="text" placeholder="Calc keyword"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="calcFormula">
            <Form.Label>Add calculator formula</Form.Label>
            <Form.Control type="text" placeholder="Calc formula"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="isSingleInput">
            <Form.Check type="checkbox" label="is single input" />
          </Form.Group>
          <Button onClick={performAdd} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function CreateTeacher(){
  
  const initTeacher = {
    username: "",
    password: ""
  }

  const [newTeacher, setNewTeacher] = useState(initTeacher);

  const performAdd = (evt) => {
    evt.preventDefault();
    // viewTeacher(false);
    facade.createTeacher(newTeacher.username, newTeacher.password);
    console.log(newTeacher);
    // Insert so it updates teacher, on db
    // like so -> createAccount = facade.createUser(user, pass);
    //createAccount(newTeacher.username, newTeacher.password);
  }

  const onChange = (evt) => {
    setNewTeacher({...newTeacher,[evt.target.id]: evt.target.value});
  }

  return(
    <>
      <Container fluid="xxl">
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter user name"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"/>
          </Form.Group>
          <Button onClick={performAdd} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default function TeacherPage() {
  // const [viewPass, setViewPass] = useState(false);
  // const [viewTopic, setViewTopic] = useState(false);
  // const [viewTeacher, setViewTeacher] = useState(false);

  const initObject = {
    viewPass: false,
    viewTopic: false,
    viewTeacher: false,
    viewCalculator: false,
    viewCalculatorList: false
  }

  const [viewObject, setViewObject] = useState(initObject);


  const opposite = (evt) => {
    // console.log(evt.target.id);
    const id = evt.target.id;
    if(id === "viewPass"){
      setViewObject({...viewObject,[id]: !viewObject.viewPass});
    }
    else if(id === "viewTopic"){
      setViewObject({...viewObject,[id]: !viewObject.viewTopic});
    }
    else if(id === "viewTeacher"){
      setViewObject({...viewObject,[id]: !viewObject.viewTeacher});
    }
    else if(id === "viewCalculatorList"){
      setViewObject({...viewObject,[id]: !viewObject.viewCalculatorList});
    }
    else{
      setViewObject({...viewObject,[id]: !viewObject.viewCalculator});
    }
    // switch(evt.target.id){
    //   case "viewPass": !viewObject.viewPass;
    //   case "viewTopic": return(!viewObject.viewTopic);
    //   case "viewTeacher": return(!viewObject.viewTeacher);
    // }
    console.log("Console: "+evt.target.id);
    // setViewObject({...viewObject,[evt.target.id]: });
    // setViewPass(!viewPass);
    // if(viewPass){
    //   setViewPass(false);
    // }
    // else{
    //   setViewPass(true);
    // }
    // console.log(viewPass);
  }

  return (
    <Container fluid="xxl">
      <br/>
      <Container fluid>
        <h3>Teacher page</h3>
      </Container>
      <br/>
      <Container as={Row}>
        <Col sm="3">
          <Container >
            {viewObject.viewPass ? (
              <Button id="viewPass" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close password</Button>
            ) : 
            (
              <Button id="viewPass" onClick={opposite} as={NavLink} to="changepw" variant="outline-secondary">Change password</Button>
            )} 
          </Container>
        </Col>
        <Col sm="3">
          <Container >
          {viewObject.viewTopic ? (
              <Button id="viewTopic" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close new topic</Button>
            ) : 
            (
              <Button id="viewTopic" onClick={opposite} as={NavLink} to="createTopic" variant="outline-secondary">Create new topic</Button>
            )}
          </Container>    
        </Col>
        <Col sm="3">
        <Container >
        {viewObject.viewTeacher ? (
          <Button id="viewTeacher" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close new teacher</Button>
        ) : 
        (
          <Button id="viewTeacher" onClick={opposite} as={NavLink} to="addTeacher" variant="outline-secondary">Create new teacher</Button>
        )}
        </Container>
        </Col>
        <Col sm="3">
        <Container >
        {viewObject.viewCalculator ? (
          <Button id="viewCalculator" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close new calculator</Button>
        ) : 
        (
          <Button id="viewCalculator" onClick={opposite} as={NavLink} to="createCalculator" variant="outline-secondary">Create new calculator</Button>
        )}
        </Container>
        </Col>
        <Col sm="3">
        <Container >
        {viewObject.viewCalculatorList ? (
          <Button id="viewCalculatorList" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close view calculators</Button>
        ) : 
        (
          <Button id="viewCalculatorList" onClick={opposite} as={NavLink} to="calculatorList" variant="outline-secondary">View calculators</Button>
        )}
        </Container>
        </Col>
      </Container>
      <br />
      <br />
      <Outlet />
        
      {/* {viewPass ? (
        <Container>
          <ChangePass viewPass={setViewPass} />
          <Button onClick={setViewPass} variant="primary" type="button">
            Close password
          </Button> 
        </Container>
      ) : (
        <Button onClick={setViewPass} variant="primary" type="button">
            Change password
        </Button>

      )}
      <br />
      <br />
      {viewTopic ? (
        <Container>
          <AddTopic viewTopic={setViewTopic} />
        </Container>
      ) : (
        <Button onClick={setViewTopic} variant="primary" type="button">
            Add new topic
        </Button>

      )}
      <br />
      <br />
      {viewTeacher ? (
        <Container>
          <CreateTeacher viewTeacher={setViewTeacher} />
        </Container>
      ) : (
        <Button onClick={setViewTeacher} variant="primary" type="button">
            Add new teacher
        </Button>

      )}
      <br />
      <br />
      <Button as={NavLink} to="/teacherPage/createCalculator">Create new calculator</Button> */}
    </Container>
  )
}
