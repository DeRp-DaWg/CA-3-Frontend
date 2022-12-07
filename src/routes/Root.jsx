import React, { Fragment, useState } from 'react'
import { Link, Outlet, useLoaderData, NavLink } from 'react-router-dom'
import { push as Menu } from "react-burger-menu"
import topicFecther from "../fetchers/topicFetcher"
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import facade from "../fetchers/apiFacade";

export default function Root() {
  const [menuElements, setMenuElements] = useState(<></>)
  // const {topics} = useLoaderData()
  const {subjects} = useLoaderData();
  const [log, setLog] = useState("Login");
    
  return (
    <>
    <Navbar bg="dark" variant="dark" style={{position: "sticky", top: 0}}>
        <Container>
          <Navbar.Brand as={NavLink} to="/">Sub school</Navbar.Brand>
        <Nav>
          {facade.getLog() ? (<Nav.Link as={NavLink} to="/teacherPage">Teacher page</Nav.Link>) : (<Nav.Link></Nav.Link>)}
          {/* <Nav.Link as={NavLink} to="/teacherPage">Teacher page</Nav.Link> */}
          <Nav.Link as={NavLink} to="/login">{log}</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    <div id="outer-container">
      <Menu pageWrapId="page-wrap" outerContainerId="outer-container">
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
      <main id="page-wrap">
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
