import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, ButtonGroup, Container, Form, ToggleButton } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import loaders from '../loaders'
import topicFetcher from "../fetchers/topicFetcher"

export default function TopicEditor() {
  const {topic, method, calculatorNames} = useLoaderData()
  const [topicDTO, setTopicDTO] = useState(topic)
  const [subject, setSubject] = useState("")
  const [filteredNames, setFilteredNames] = useState(calculatorNames)
  const [filter, setFilter] = useState("")
  
  const isNewEntry = (method === "POST")

  useEffect(() => {
    const newFilteredNames = calculatorNames.filter((name) => {
      if (name.toLowerCase().includes(filter.toLowerCase()) || topicDTO.calculator.name === name) return true
    })
    setFilteredNames(newFilteredNames)
  }, [filter, topicDTO.calculator.name])
  
  function handleSubmit() {
    console.log(topicDTO)
    console.log(topicFetcher.sendTopic(topicDTO, subject, method))
  }
  
  return (
    <Container>
      <h1>{isNewEntry ? "Create" : "Edit"} topic</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formTopicName">
          <Form.Label>Name</Form.Label>
          <Form.Control disabled={!isNewEntry} value={topicDTO.name} onChange={event => setTopicDTO(topic => {return {...topic, name: event.target.value}})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control value={subject} onChange={event => setSubject(event.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTopicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as={"textarea"} rows={5} value={topicDTO.description} onChange={event => setTopicDTO(topic => {return {...topic, description: event.target.value}})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTopicExample">
          <Form.Label>Example</Form.Label>
          <Form.Control value={topicDTO.example} onChange={event => setTopicDTO(topic => {return {...topic, example: event.target.value}})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTopicFormula">
          <Form.Label>Formula</Form.Label>
          <Form.Control value={topicDTO.formula} onChange={event => setTopicDTO(topic => {return {...topic, formula: event.target.value}})}/>
        </Form.Group>
        <Form.Label>Calculators</Form.Label>
        <div>
          <Form.Group className="mb-3" controlId="formFilter">
            {/* <Form.Label>Filter</Form.Label> */}
            <Form.Control value={filter} onChange={event => setFilter(event.target.value)}/>
          </Form.Group>
          {filteredNames.map((name, index) => (
            <ToggleButton
              key={index}
              id={`radio-${index}`}
              type="radio"
              variant={'outline-success'}
              name="radio"
              value={name}
              checked={topicDTO.calculator.name === name}
              onChange={event => setTopicDTO({...topicDTO, calculator: {name: event.currentTarget.value}})}
            >
              {name}
            </ToggleButton>
          ))}
        </div>
        <br/>
        <Button disabled={!topicDTO.name} onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
