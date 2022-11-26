import React, { useState } from 'react'
import { Link, Outlet, useLoaderData } from 'react-router-dom'
import { push as Menu } from "react-burger-menu"
import topicFecther from "../fetchers/topicFetcher"
import { Container } from 'react-bootstrap'

export default function Root() {
  const [menuElements, setMenuElements] = useState(<></>)
  const {topics} = useLoaderData()
    
  return (
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
  )
}

export async function rootLoader() {
  const topics = await topicFecther.getTopics()
  return {topics}
}
