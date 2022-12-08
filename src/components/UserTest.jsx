import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Calculator from '../fetchers/calculatorFetcher';
import { useLoaderData } from 'react-router-dom'
import topicFecther from "../fetchers/topicFetcher"

export default function UserTest( {topic, viewT} ) {

    const init = { ans1: 0, ans2: 0, ans3: 0 };
    const [answers, setAnswers] = useState(init);
    let correctAnswers = 0;
    const [isAnswered, setIsAnswered] = useState(false);
    let url = "/arithmetic/add";
    let keyword = "expression";
    let singleInput = true;
    const [numberArray, setNumberArray] = useState([]);

  const additionCalculation = (() => {
      let result = "";
      let number;
      const amounts = Math.floor((Math.random() * 5)+2);
      for(let i = 0; i < amounts-1; i++){
          number = Math.floor((Math.random() * 9)+1);
          result += number + " + ";
      }
      number = Math.floor((Math.random() * 9)+1);
      result += number;
      url = "/arithmetic/add";
      keyword = "expression";
      singleInput = true;
      return result;
  })

  const fibonacciCalculation = () => {
    const number = Math.floor((Math.random() * 9)+1);
    const constNumber = number;
    let result = "The "+constNumber+"th fibonacci number";
    // stringValAnswers.push(number);
    url = "/numbertheory/fibonacci/number";
    keyword = "number";
    singleInput = true;
    console.log("Hello from number: "+number);
    numberArray.push(constNumber);
    return result;
  }

const onChange = (evt) => {
  setAnswers({...answers,[evt.target.id]: evt.target.value});
}

const onSubmit = async (evt) => {
  evt.preventDefault();
  // let list = [];
  stringValAnswers.map((ele, index) => {
    console.log(ele);
    Calculator.getCalculation(url, [{
      keyword: keyword,
      isSingleInput: singleInput,
      value: (topic === 'Fibonacci' ? numberArray[index] : ele)
    }])
    .then(JSON => {
        if(JSON.Solution == answers[Object.keys(answers)[index]]){
            correctAnswers++;
            setResultRow(percentCalc()+"% correct answers!")
            
        }
        console.log(JSON.Solution+":"+numberArray[index]);
      // list.push(JSON.Solution == answers[Object.keys(answers)[index]]); // Instead of 2, use Calculator(ele)
      // setBoolValAnswers([...list]);
      
    });
    
  });
  setIsAnswered(true);
}

const percentCalc = () => {
  const calc = Math.floor(correctAnswers/stringValAnswers.length*100);
  return (calc);
}

const topicSwitch = () => {
  switch (topic) {
    case 'Addition': 
      // setUrl("/arithmetic/add");
      // setKeyword("expression");
      // setSingleInput(true);
      return additionCalculation();
    case 'Fibonacci': 
      return  fibonacciCalculation();
    default:
      return "No tests available";
  }
}

const initAnswers = [topicSwitch(), topicSwitch(), topicSwitch()];
const [stringValAnswers , setStringValAnswers] = useState(initAnswers);

const setViewTest = () => {
  viewT(false);
}

const unAnsweredRow = Object.keys(answers).map((ele, index) => 
      <Form.Group key={ele} as={Row} className="mb-3" controlId={ele}>
          <h5>Question {index+1}</h5>
          <Form.Label column sm="6">{stringValAnswers[index]} =</Form.Label>
          <Col sm="4">
          <Form.Control type="number" placeholder="Enter answer"/>
          </Col>
      </Form.Group>
    );

    const [resultRow, setResultRow] = useState("0% correct answers!");

  return(
    <>
    {isAnswered ? (
      <Container fluid="xxl">
        <h4>Test results</h4>
        <p>{resultRow}</p>
        <br/>
        <Button onClick={setViewTest} variant="primary" type="button">
            Close test
          </Button>
      </Container>
    ) : (
      <Container fluid="xxl">
        <Form onChange={onChange}>
          {unAnsweredRow}
          <Button onClick={onSubmit} variant="primary" type="button">
            Submit answers
          </Button>
        </Form>
        <br/>
        <Button onClick={setViewTest} variant="primary" type="button">
            Close test
          </Button>
      </Container>
    )}
    </>
  )
}