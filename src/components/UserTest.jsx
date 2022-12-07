import React, { useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLoaderData } from 'react-router-dom'
import topicFecther from "../fetchers/topicFetcher"

// function UnAnswered({ topic, answerList, isAnswered }) {

//   const init = { ans1: 0, ans2: 0, ans3: 0 };
//   const [answers, setAnswers] = useState(init);
//   const correctAnswer = [];

//   const additionCalculation = (() => {
//       let result = "";
//       let number;
//       const amounts = Math.floor((Math.random() * 5)+2);
//       for(let i = 0; i < amounts-1; i++){
//           number = Math.floor((Math.random() * 9)+1);
//           result += number + " + ";
//       }
//       number = Math.floor((Math.random() * 9)+1);
//       result += number;
//       correctAnswer.push(result);
//       return result;
//   })

//   const fibonacciCalculation = () => {
//     const number = Math.floor((Math.random() * 9)+1);
//     let result = "The "+number+"th fibonacci number";
//     correctAnswer.push(number);
//     return result;
//   }

// const onChange = (evt) => {
//   setAnswers({...answers,[evt.target.id]: evt.target.value});
// }

// const onSubmit = (evt) => {
//   evt.preventDefault();
//   let list = []
//   correctAnswer.map((ele, index) => {
//     list.push(2 == answers[Object.keys(answers)[index]]); // Instead of 2, use Calculator(ele)
//   });
//   answerList(list);
//   isAnswered(true);
// }

// const topicSwitch = () => {
//     switch (topic) {
//       case 'Addition': 
//         return <><p>{additionCalculation()}</p></>
//       case 'Fibonacci': 
//         return <><p>{fibonacciCalculation()}</p></>
//       default:
//         return <><p>No tests available</p></>
//     }
// }

//   return(
//     <Container fluid="xxl">
//       <Form onChange={onChange}>
//         <Form.Group as={Row} className="mb-3" controlId="ans1">
//           <Form.Label>{topicSwitch()} = </Form.Label>
//           <Form.Control type="number" placeholder="Enter answer"/>
//         </Form.Group>
//         <Form.Group as={Row} className="mb-3" controlId="ans2">
//           <Form.Label>{topicSwitch()} = </Form.Label>
//           <Form.Control type="number" placeholder="Enter answer"/>
//         </Form.Group>
//         <Form.Group as={Row} className="mb-3" controlId="ans3">
//           <Form.Label>{topicSwitch()} = </Form.Label>
//           <Form.Control type="number" placeholder="Enter answer"/>
//         </Form.Group>
//         <Button onClick={onSubmit} variant="primary" type="button">
//           Submit answers
//         </Button>
//       </Form>
//     </Container>
//   )
// }

export default function UserTest( {topic, viewT} ) {

    const init = { ans1: 0, ans2: 0, ans3: 0 };
    const [answers, setAnswers] = useState(init);
    // const initAnswers = [topicSwitch, topicSwitch, topicSwitch];
    // const [stringValAnswers, setStringValAnswers] = useState(initAnswers);
    const [boolValAnswers, setBoolValAnswers] = useState([false, false, false]);
    const [isAnswered, setIsAnswered] = useState(false);

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
      // stringValAnswers.push(result);
      return result;
  })

  const fibonacciCalculation = () => {
    const number = Math.floor((Math.random() * 9)+1);
    let result = "The "+number+"th fibonacci number";
    // stringValAnswers.push(number);
    return result;
  }

const onChange = (evt) => {
  setAnswers({...answers,[evt.target.id]: evt.target.value});
}

const onSubmit = (evt) => {
  evt.preventDefault();
  let list = [];
  stringValAnswers.map((ele, index) => {
    console.log(ele);
    list.push(2 == answers[Object.keys(answers)[index]]); // Instead of 2, use Calculator(ele)
  });
  setBoolValAnswers(list);
  setIsAnswered(true);
}

const topicSwitch = () => {
  switch (topic) {
    case 'Addition': 
      return additionCalculation();
    case 'Fibonacci': 
      return  fibonacciCalculation();
    default:
      return "No tests available";
  }
}

// const stringValAnswers = [topicSwitch(), topicSwitch(), topicSwitch()];
    const initAnswers = [topicSwitch(), topicSwitch(), topicSwitch()];
    const [stringValAnswers, setStringValAnswers] = useState(initAnswers);

// useEffect(() => {
//   if(!isAnswered){
//     setContent(
//       <Container fluid="xxl">
//         <Form onChange={onChange}>
//           {unAnsweredRow}
//           <Button onClick={onSubmit} variant="primary" type="button">
//             Submit answers
//           </Button>
//         </Form>
//       </Container>
//     );
//   }
//   else{
//     setContent(<h4>Nothing here</h4>);
//   }
// },[])
const firstContent = () => {
  return(
  <Container fluid="xxl">
        <Form onChange={onChange}>
          {unAnsweredRow}
          <Button onClick={onSubmit} variant="primary" type="button">
            Submit answers
          </Button>
        </Form>
    </Container>
  )
}

const setViewTest = () => {
  viewT(false);
}

const unAnsweredRow = Object.keys(answers).map((ele, index) => 
      // console.log(ele)
      <Form.Group key={ele} as={Row} className="mb-3" controlId={ele}>
          <Form.Label column sm="6">{stringValAnswers[index]} =</Form.Label>
          <Col sm="4">
          <Form.Control type="number" placeholder="Enter answer"/>
          </Col>
      </Form.Group>
    );

    const resultRow = boolValAnswers.map((ele, index) => 
      <p key={index}>Answer {index+1} is: {ele ? "Correct" : "Incorrect"}</p>
      // <p key={index}>Answer {index} is: {ele}</p>
      // <p>Hello</p>
    );

    // const [content, setContent] = useState(firstContent());

  return(
    <>
    {/* {content} */}
    {isAnswered ? (
      <Container fluid="xxl">
        <h4>Test results</h4>
        {resultRow}
      </Container>
    ) : (
      <Container fluid="xxl">
        <Form onChange={onChange}>
        {/* <Form.Group as={Row} className="mb-3" controlId="ans1">
          <Form.Label>{topicSwitch()} = </Form.Label>
          <Form.Control type="number" placeholder="Enter answer"/>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="ans2">
          <Form.Label>{topicSwitch()} = </Form.Label>
          <Form.Control type="number" placeholder="Enter answer"/>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="ans3">
          <Form.Label>{topicSwitch()} = </Form.Label>
          <Form.Control type="number" placeholder="Enter answer"/>
      </Form.Group> */}
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

// export async function topicLoader({params}) {
//   const topic = await topicFecther.getTopic(params.topicName)
//   if (topic.code === 500 || topic.code === 404) {
//     throw new Response("Not Found", { status: 404 })
//   }
//   return {topic}
// }
