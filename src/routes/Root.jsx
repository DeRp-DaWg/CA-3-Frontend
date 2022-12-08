import React, { Fragment, useState } from 'react'
import { Link, Outlet, useLoaderData, NavLink } from 'react-router-dom'
import { slide as Menu } from "react-burger-menu"
import topicFecther from "../fetchers/topicFetcher"
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import facade from "../fetchers/apiFacade";
import { useEffect } from 'react'

export default function Root() {
  const [menuElements, setMenuElements] = useState(<></>)
  // const {topics} = useLoaderData()
  const {subjects} = useLoaderData();
  const [log, setLog] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    if (facade.getToken() !== null) {
      facade.getUserFromToken(setLog)
    }
  }, [isLoggedIn])
  
  useEffect(() => {
    if (log === "Login") {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [log])
    
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/" style={{"position": "sticky", "left": "62px"}}>Sub school</Navbar.Brand>
        <Nav>
          {isLoggedIn ? (<Nav.Link as={NavLink} to="/teacherPage">Teacher page</Nav.Link>) : (<Nav.Link></Nav.Link>)}
          {/* <Nav.Link as={NavLink} to="/teacherPage">Teacher page</Nav.Link> */}
          <Nav.Link as={NavLink} to="/login">{log}</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    <div id="outer-container">
      <Menu customCrossIcon={ false } pageWrapId="page-wrap" outerContainerId="outer-container">
          {subjects.map((subject) => {
            return (
              <Fragment key={subject.name}>
              <h3>{subject.name}</h3>
              {subject.topics.map((topic) => {
                return(
                  <Fragment key={topic.name}>
                  <Link to={`topic/${subject.name}/${topic.name}`} className="menu-item" key={topic.name}>{topic.name}</Link>
                  <br />
                  </Fragment>
                )
              })}
              <br/>
              </Fragment>
            )
          })}
      </Menu>
      <main id="page-wrap" style={{"maxHeight": "calc(100vh - 40px - 1rem)", "overflowY": "auto", "paddingBottom": "50px"}}>
        <Outlet context={{setLog}} />
      </main>
    </div>
    </>
  )
}

export async function rootLoader() {
  const subjects = await topicFecther.getSubjects(); // Implemented
  // const topics = await topicFecther.getTopics()
  // return {topics}
  return {subjects}
}
