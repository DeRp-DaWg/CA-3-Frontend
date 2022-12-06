import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import calculatorFecther from "../fetchers/calculatorFetcher"

export default function calculator(props) {
  const location = useLocation()
  const [inputValues, setInputValues] = useState({})
  const [result, setResult] = useState(0)
  
  const calculatorData = props.calculatorData
  const fields = calculatorData.calculatorFields
  
  useEffect(() => {
    const keysFromJson = {}
    fields.forEach(field => {
      if (field.isSingleInput) {
        keysFromJson[field.keyword] = {symbols: field.tags, value: ""}
      } else {
        const tagsWithValues = {}
        field.tags.forEach(tag => {
          tagsWithValues[tag] = ""
        })
        keysFromJson[field.keyword] = {values: tagsWithValues}
      }
    })
    setInputValues(keysFromJson)
  }, [location])
  
  function handleSingleInputChange(event, keyword) {
    event.preventDefault()
    const char = event.target.value.slice(-1)
    const fieldData = inputValues[keyword]
    const inputValueClone = structuredClone(inputValues)
    if (!isNaN(Number(char)) || fieldData.symbols.includes(char)) {
      inputValueClone[keyword].value = event.target.value
      setInputValues(inputValueClone)
    }
  }
  
  function handleMultiInputChange(event, keyword, value) {
    event.preventDefault()
    const char = event.target.value.slice(-1)
    const inputValueClone = structuredClone(inputValues)
    if (!isNaN(Number(char))) {
      inputValueClone[keyword].values[value] = event.target.value
      setInputValues(inputValueClone)
    }
  }
  
  function createFields() {
    const inputFields = []
    Object.keys(inputValues).forEach(keyword => {
      const fieldData = inputValues[keyword]
      if ("value" in fieldData) {
        inputFields.push(
          <Form.Group as={Col} controlId={"formInput"+keyword} key={keyword}>
            <Form.Label>{keyword}</Form.Label>
            <Form.Control value={fieldData.value} onChange={event => handleSingleInputChange(event, keyword)}/>
          </Form.Group>
        )
      } else {
        Object.keys(fieldData.values).forEach(value => {
          inputFields.push(
            <Form.Group as={Col} controlId={"formInput"+keyword+value} key={keyword+value}>
              <Form.Label>{value}</Form.Label>
              <Form.Control value={fieldData.values[value]} onChange={event => handleMultiInputChange(event, keyword, value)}/>
            </Form.Group>
          )
        })
      }
    })
    return inputFields
  }
  
  function sendInformation(event) {
    event.preventDefault()
    const data = fields.map(field => {
      const entry = {
        "keyword": field.keyword,
        "isSingleInput": field.isSingleInput
      }
      if (field.isSingleInput) {
        entry["value"] = inputValues[field.keyword]["value"]
      } else {
        entry["formula"] = field.formula
        entry["values"] = inputValues[field.keyword]["values"]
      }
      return entry
    })
    calculatorFecther.getCalculation(calculatorData.calculatorURL, data)
    .then(json => {
      setResult(json.Solution || "Invalid expression")
    }
    )
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
