import React, { useState } from 'react'
import { Link, Outlet, useLoaderData, NavLink } from 'react-router-dom'
import { push as Menu } from "react-burger-menu"
import topicFecther from "../fetchers/topicFetcher"
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Root() {
  const [menuElements, setMenuElements] = useState(<></>)
  const {topics} = useLoaderData()
    
  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">Sub school</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/teacherPage">Teacher page</Nav.Link>
          <Nav.Link as={NavLink} to="/login">Log-in/out</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    <div id="outer-container">
      <Menu pageWrapId="page-wrap" outerContainerId="outer-container">
        {topics.map((topic) => (
          <Link to={`topic/${topic.name}`} className="menu-item" key={topic.name}>{topic.name}</Link>
        ))}
      </Menu>
      <main id="page-wrap">
        <Outlet/>
      </main>
    </div>
    </>
  )
}

export async function rootLoader() {
  const topics = await topicFecther.getTopics()
  return {topics}
}
