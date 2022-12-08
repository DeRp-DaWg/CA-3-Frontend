import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { useLoaderData, useNavigate, useRouteLoaderData } from 'react-router-dom'
import calculatorFetcher from "../fetchers/calculatorFetcher"

export default function CalculatorEditor() {
  // const {calculator} = useRouteLoaderData("calculator")
  const loaderData = useRouteLoaderData("calculator")
  const [calculatorDTO, setCalculatorDTO] = useState({name: "", calculatorURL: "", calculatorFields: []})
  const calculatorFieldTemplate = {
    id: null,
    keyword: "",
    formula: "",
    isSingleInput: false,
    tags: [""]
  }
  const [fields, setFields] = useState([])
  const navigate = useNavigate()
  
  const [isNewEntry, setIsNewEntry] = useState(true)
  
  useEffect(() => {
    if (loaderData) {
      setCalculatorDTO(loaderData.calculator)
      setIsNewEntry(false)
    }
  }, [])
  
  useEffect(() => {
    const calculatorFieldsDTO = calculatorDTO.calculatorFields
    const fields = calculatorFieldsDTO.map((field, fieldIndex) => {
      const isSingleInput = calculatorFieldsDTO[fieldIndex].isSingleInput
      const tags = field.tags.map((tag, tagIndex) => {
        return (
          <Container key={tagIndex}>
            <Form.Group className="mb-3" controlId={"tag"+fieldIndex+"-"+tagIndex}>
              <Form.Label>{isSingleInput ? "Symbol" : "Tag"} {tagIndex+1}</Form.Label>
              <InputGroup>
                <Form.Control value={calculatorFieldsDTO[fieldIndex].tags[tagIndex]} onChange={event => {updateTagField(event, fieldIndex, tagIndex)}}/>
                <Button variant="danger" tabIndex={1} onClick={event => removeTag(fieldIndex, tagIndex)}><MdDelete/></Button>
              </InputGroup>
            </Form.Group>
          </Container>
        )
      })
      return (
        <Fragment key={fieldIndex}>
        <Form.Label>Field {fieldIndex+1}</Form.Label>
        <div className="mb-3" style={{backgroundColor: "#dae1eb", border: "solid", borderColor: "#687a8c", borderWidth: "1px", borderRadius: ".375rem"}}>
          <Container>
            <Form.Group className="mb-3" controlId={"keyword"+fieldIndex}>
              <Form.Label>Keyword</Form.Label>
              <Form.Control value={calculatorFieldsDTO[fieldIndex].keyword} onChange={event => {updateField(event, fieldIndex, "keyword")}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId={"formula"+fieldIndex}>
              <Form.Label>Formula</Form.Label>
              <Form.Control disabled={isSingleInput} value={calculatorFieldsDTO[fieldIndex].formula} onChange={event => {updateField(event, fieldIndex, "formula")}}/>
            </Form.Group>
            <Form.Label>{isSingleInput ? "Allowed symbols" : "Tags"}</Form.Label>
            <div className="mb-3" style={{backgroundColor: "#c5cbd4", border: "solid", borderColor: "#687a8c", borderWidth: "1px", borderRadius: ".375rem"}}>
              {tags}
            </div>
            <Button onClick={() => createNewTag(fieldIndex)}>Create new tag</Button>
            <Form.Check type="checkbox" label="Single input" checked={calculatorFieldsDTO[fieldIndex].isSingleInput} onChange={event => {updateField(event, fieldIndex, "isSingleInput")}}/>
            <Button className="mb-3" variant="danger" onClick={event => removeField(fieldIndex)}><MdDelete/></Button>
          </Container>
        </div>
        </Fragment>
      )
    })
    fields.push()
    setFields(fields)
  }, [calculatorDTO])
  
  function updateField(event, index, variable) {
    let value = ""
    if (variable === "isSingleInput") {
      value = event.target.checked
    } else {
      value = event.target.value
    }
    setCalculatorDTO(calculator => {
      const newCalculator = JSON.parse(JSON.stringify(calculator))
      newCalculator.calculatorFields[index][variable] = value
      return newCalculator
    })
  }
  
  function updateTagField(event, index, tagIndex) {
    setCalculatorDTO(calculator => {
      const newCalculator = JSON.parse(JSON.stringify(calculator))
      newCalculator.calculatorFields[index].tags[tagIndex] = event.target.value
      return newCalculator
    })
  }
  
  function createNewField() {
    setCalculatorDTO(calculator => {return {...calculator, calculatorFields: [...calculator.calculatorFields, {...calculatorFieldTemplate}]}})
  }
  
  function createNewTag(index) {
    setCalculatorDTO(calculator => {
      const newCalculator = JSON.parse(JSON.stringify(calculator))
      newCalculator.calculatorFields[index].tags.push("")
      return newCalculator
    })
  }
  
  function removeTag(fieldIndex, tagIndex) {
    setCalculatorDTO(calculator => {
      const newCalculator = JSON.parse(JSON.stringify(calculator))
      newCalculator.calculatorFields[fieldIndex].tags.splice(tagIndex, 1)
      return newCalculator
    })
  }
  
  function removeField(index) {
    setCalculatorDTO(calculator => {
      const newCalculator = JSON.parse(JSON.stringify(calculator))
      newCalculator.calculatorFields.splice(index, 1)
      return newCalculator
    })
  }
  
  function handleSubmit() {
    calculatorFetcher.sendCalculator(calculatorDTO, isNewEntry)
    .then(response => {
      console.log(response)
      // window.location.href = "./"
      navigate("/teacherPage")
    })
  }
  
  return (
    <Container>
      <h1>{isNewEntry ? "Create" : "Edit"} calculator</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formCalculatorName">
          <Form.Label>Calculator Name</Form.Label>
          <Form.Control disabled={!isNewEntry} value={calculatorDTO.name} onChange={event => setCalculatorDTO(calculator => {return {...calculator, name: event.target.value}})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCalculatorName">
          <Form.Label>Calculator URL</Form.Label>
          <Form.Control value={calculatorDTO.calculatorURL} onChange={event => setCalculatorDTO(calculator => {return {...calculator, calculatorURL: event.target.value}})}/>
        </Form.Group>
        {fields}
        <Button onClick={createNewField}>Create new field</Button>
        <br/>
        <br/>
        <Button onClick={handleSubmit}>Submit</Button>
      </Form>
    </Container>
  )
}
