import React from 'react'
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap'
import { NavLink, useLoaderData } from 'react-router-dom'
import calculatorFetcher from "../fetchers/calculatorFetcher"

export default function CalculatorList() {
  const {calculatorNames} = useLoaderData()
  
  function deleteCalculator(event) {
    calculatorFetcher.deleteCalculator(event.target.value)
    .then(() => {
      
    })
  }
  
  return (
    <Container>
      {calculatorNames.map(name => {
        return (
          <Row key={name}>
            <ButtonGroup>
              <Button disabled variant="secondary" style={{"width": "100%"}}>{name}</Button>
              <Button variant="primary" as={NavLink} to={name+"/edit"}>edit</Button>
              <Button variant="danger" value={name} onClick={deleteCalculator}>delete</Button>
            </ButtonGroup>
          </Row>
        )
      })}
    </Container>
  )
}
