import React from 'react'
import { Container } from 'react-bootstrap'
import { useLoaderData } from 'react-router-dom'
import topicFecther from "../fetchers/topicFetcher"

import UserTest from "./UserTest"

export default function Topic() {
  const {topic} = useLoaderData()
  
  return (
    <Container>
      <h1>{topic.name}</h1>
      <p>{topic.description}</p>
      <p>{topic.example}</p>
      <p>{topic.formula}</p>
      <p>{topic.calculatorURL}</p>

      <UserTest topic={topic.name} />
    </Container>
  )
}

export async function topicLoader({params}) {
  const topic = await topicFecther.getTopic(params.topicName)
  if (topic.code === 500 || topic.code === 404) {
    throw new Response("Not Found", { status: 404 })
  }
  return {topic}
}
