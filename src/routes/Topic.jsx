import React from 'react'
import { Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import topicFecther from "../fetchers/topicFetcher"
import Calculator from "../components/calculator"
import UserTest from "../components/UserTest"

export default function Topic() {
  const {topic} = useLoaderData()
  
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

export async function topicLoader({params}) {
  const topic = await topicFecther.getTopicByName(params.topicName)
  if (topic.code === 500 || topic.code === 404) {
    throw new Response("Not Found", { status: 404 })
  }
  return {topic}
}
