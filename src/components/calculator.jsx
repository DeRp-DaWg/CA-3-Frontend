import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import calculatorFecther from "../fetchers/calculatorFetcher"

export default function calculator(props) {
  const location = useLocation()
  const [inputValues, setInputValues] = useState({})
  const [result, setResult] = useState(0)
  
  // const jsonFibonacci = {
  //   params: [
  //     {
  //       keyword: "number",
  //       formula: "fn",
  //       tags: [
  //         "fn"
  //       ],
  //     }
  //   ]
  // }
  
  // const jsonAddition = {
  //   params: [
  //     {
  //       keyword: "expression",
  //       formula: "a+b",
  //       tags: [
  //         "a",
  //         "b"
  //       ]
  //     }
  //   ]
  // }
  const obj = props.calculatorData
  
  useEffect(() => {
    const keysFromJson = {}
    obj.forEach(param => {
      param.tags.forEach(tag => {
        keysFromJson[tag] = ""
      })
    })
    setInputValues(keysFromJson)
  }, [location])
  
  function handleChange(event, keyword) {
    const number = Number(event.target.value)
    if (!isNaN(number)) {
      setInputValues({...inputValues, ...{[keyword]: event.target.value}})
    }
    event.preventDefault()
  }
  
  function createFields() {
    return Object.keys(inputValues).map(keyword => {
      return (
        <Form.Group as={Col} controlId={"formInput"+keyword} key={keyword}>
          <Form.Label>{keyword}</Form.Label>
          <Form.Control value={inputValues[keyword]} onChange={event => handleChange(event, keyword)}/>
        </Form.Group>
      )
    })
  }
  
  function sendInformation(event) {
    let data = {}
    data = obj.map(param => {
      const values = {}
      param.tags.forEach(tag => {
        values[tag] = inputValues[tag]
      })
      return ({
        "keyword": param.keyword,
        "formula": param.formula,
        "values": values
      })
    })
    console.log(data)
    calculatorFecther.getCalculator(props.apiURL, data)
    .then(json => {
      setResult(json.Solution || "Invalid expression")
    }
    )
    event.preventDefault()
  }
  
  return (
    <div>
      <Form>
        <Row className="mb-3">
          {createFields()}
        </Row>
        <p>{result}</p>
        <Button variant="primary" type="submit" onClick={sendInformation}>Submit</Button>
      </Form>
    </div>
  )
}
