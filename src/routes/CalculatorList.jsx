import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap'
import { MdDelete, MdModeEdit, MdOutlineDelete } from 'react-icons/md'
import { NavLink, useLoaderData, useRouteLoaderData } from 'react-router-dom'
import calculatorFetcher from "../fetchers/calculatorFetcher"

export default function CalculatorList() {
  const loaderData = useRouteLoaderData("teacherPage")
  const [calculatorNames, setCalculatorNames] = useState([])
  
  useEffect(() => {
    if (loaderData) {
      setCalculatorNames(loaderData.calculatorNames)
    }
  }, [])
  
  function deleteCalculator(event) {
    calculatorFetcher.deleteCalculator(event.target.value)
    .then(res => {
      if (!res.code) {
        const newCalculatorNames = [...calculatorNames]
        const index = newCalculatorNames.indexOf(event.target.value)
        if (index > -1) {
          newCalculatorNames.splice(index, 1)
          setCalculatorNames(newCalculatorNames)
        }
      }
    })
  }
  
  return (
    <Container>
      {calculatorNames.map(name => {
        return (
          <Row key={name}>
            <ButtonGroup>
              <Button disabled variant="secondary" style={{"width": "100%"}}>{name}</Button>
              <Button variant="primary" as={NavLink} to={"/calculator/"+name+"/edit"}><MdModeEdit/></Button>
              <Button variant="danger" value={name} onClick={deleteCalculator}><MdDelete/></Button>
            </ButtonGroup>
          </Row>
        )
      })}
    </Container>
  )
}
