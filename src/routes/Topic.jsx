import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useRouteLoaderData, useNavigate } from 'react-router-dom'
import topicFecther from "../fetchers/topicFetcher"
import apiFacade from "../fetchers/apiFacade";
import Calculator from "../components/calculator"
import UserTest from "../components/UserTest"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {MdEditNote, MdDeleteForever} from "react-icons/md"

export default function Topic() {
  const {topic} = useRouteLoaderData("topic")
  const [viewTest, setViewTest] = useState(false);
  let navigate = useNavigate();

  const deleteTopic = async () => {
    await apiFacade.deleteTopic(topic.name);
    navigate("/");
  }
  
  return (
    <Container>
      <Container as={Row}>
        <Col sm="8">
        <h1>{topic.name}</h1>
        </Col>
        <Col sm="2">
          <Container>
            <Button onClick={deleteTopic} variant="outline-secondary"><MdDeleteForever size='1x' /></Button>
          </Container>      
        </Col>
        <Col sm="2">
        <Container>
            <Button variant="outline-secondary"><MdEditNote size='1x' /></Button>
        </Container>
        </Col>
      </Container>
      <h4>Description</h4>
      <p>{topic.description}</p>
      <h4>Example</h4>
      <p>{topic.example}</p>
      <h4>Formula</h4>
      <p>{topic.formula}</p>
      <br/>
      {viewTest ? (
        <>
          <h4>Test</h4>
          <Container>
            <UserTest topic={topic.name} viewT={setViewTest} />
          </Container>
        </>
      ) : (
          <>
            <h4>Calculator</h4>
            {topic.calculator && <Calculator calculatorData={topic.calculator}/>}
            <br/>
            <br/>
            <Button onClick={setViewTest} variant="primary" type="button">
                Take test
            </Button>
          </>
      )}
    </Container>
  )
}
