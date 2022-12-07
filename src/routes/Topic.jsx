import React from 'react'
import { Container } from 'react-bootstrap'
import { useRouteLoaderData } from 'react-router-dom'
import Calculator from "../components/calculator"
import UserTest from "../components/UserTest"

export default function Topic() {
  const {topic} = useRouteLoaderData("topic")
  
  return (
    <Container>
      <h1>{topic.name}</h1>
      <p>{topic.description}</p>
      <p>{topic.example}</p>
      <p>{topic.formula}</p>
      {topic.calculator && <Calculator calculatorData={topic.calculator}/>}
      <UserTest topic={topic.name} />
    </Container>
  )
}
