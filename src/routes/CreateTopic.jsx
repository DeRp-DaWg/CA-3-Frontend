import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default function CreateTopic() {
  const [topicData, setTopicData] = useStateCallback({
    name: "",
    description: "",
    example: "",
    formula: "",
    calculatorURL: "",
    calculator: {
      name: "",
      calculatorFields: []
    }
  })
  const [calculatorInputFields, setCalculatorInputFields] = useState([])
  function createNewField() {
    const fieldIndex = calculatorInputFields.length
    const calculatorFieldData = {
      keyword: "",
      formula: "",
      isSingleInput: false,
      tags: []
    }
    const calculatorFields = [...topicData.calculator.calculatorFields]
    calculatorFields[fieldIndex] = calculatorFieldData
    calculatorFields[fieldIndex+1] = calculatorFieldData
    //{...topicData, ...{calculator: {...topicData.calculator,...{name: event.target.value}}}}
    setTopicData({...topicData, calculator: {...topicData.calculator, calculatorFields: calculatorFields}}, newTopicData => {
      console.log(newTopicData)
      const field = (() => {
        return (
          <div key={fieldIndex}>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Single Input"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Keyword</Form.Label>
              {/* <Form.Control value={topicData.calculator.calculatorFields[fieldIndex].keyword}/> */}
              {/* Can't get value working in this field so i have to do without. (we probably won't need it anyway) */}
              {/* <Form.Control value={topicData.calculator.calculatorFields[fieldIndex].keyword} onChange={event => {
                const newCalculatorFields = [...newTopicData.calculator.calculatorFields]
                newCalculatorFields[fieldIndex].keyword = event.target.value
                console.log(newTopicData.calculator.calculatorFields[fieldIndex].keyword)
                setTopicData({...newTopicData, calculator: {...newTopicData.calculator, calculatorFields: newCalculatorFields}})}}/> */}
              <Form.Control value={topicData.calculator.calculatorFields[fieldIndex].keyword} onChange={event => {
                const newCalculatorFields = [...topicData.calculator.calculatorFields]
                newCalculatorFields[fieldIndex].keyword = event.target.value
                console.log(topicData.calculator.calculatorFields[fieldIndex].keyword)
                setTopicData({...newTopicData, calculator: {...newTopicData.calculator, calculatorFields: newCalculatorFields}})}}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Formula</Form.Label>
              {/* <Form.Control value={topicData.calculator.calculatorFields[fieldIndex].formula} onChange={event => handleMultiInputChange(event, keyword, value)}/> */}
            </Form.Group>
            <Container style={{"backgroundColor": "#DDDDDD"}}>
              <h1>Tags</h1>
              <Button onClick={createNewSymbolField}>Create new tag</Button>
              {/* {calculatorInputFields[fieldIndex].symbolFields} */}
            </Container>
          </div>
        )
      })()
      setCalculatorInputFields([...calculatorInputFields, field])
    })
    
  }
  
  function createNewSymbolField() {
    return <p>I'm a symbol field</p>
  }
  
  function handleSubmit() {
    
  }
  
  return (
    <Container>
      <Form>
        <h1>Topic</h1>
        <Form.Group className="mb-3" controlId="formTopicName">
          <Form.Label>Name</Form.Label>
          <Form.Control value={topicData.name} onChange={event => setTopicData({...topicData, ...{name: event.target.value}})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTopicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={5} value={topicData.description} onChange={event => setTopicData({...topicData, ...{description: event.target.value}})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTopicExample">
          <Form.Label>Example</Form.Label>
          <Form.Control as="textarea" rows={3} value={topicData.example} onChange={event => setTopicData({...topicData, ...{example: event.target.value}})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTopicFormula">
          <Form.Label>Formula</Form.Label>
          <Form.Control value={topicData.formula} onChange={event => setTopicData({...topicData, ...{formula: event.target.value}})}/>
        </Form.Group>
        <Container style={{"backgroundColor": "#EEEEEE"}}>
          <h1>Calculator</h1>
          <Form.Group className="mb-3" controlId="formCalculatorName">
            <Form.Label>Name</Form.Label>
            <Form.Control value={topicData.calculator.name} onChange={event => setTopicData({...topicData, ...{calculator: {...topicData.calculator,...{name: event.target.value}}}})}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCalculatorURL">
            <Form.Label>Calculator API URL</Form.Label>
            <Form.Control value={topicData.calculatorURL} onChange={event => setTopicData({...topicData, ...{calculatorURL: event.target.value}})}/>
          </Form.Group>
        </Container>
        <Container>
          <Button onClick={createNewField}>Create new field</Button>
          {calculatorInputFields}
          <Button onClick={handleSubmit}>Submit</Button>
        </Container>
      </Form>
    </Container>
  )
}

function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render, 
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}
