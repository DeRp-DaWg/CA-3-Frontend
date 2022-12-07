import { fetchURL, dataFactory } from "./fetcherUtils"

const baseURL = "http://onebrightcreation.com:8081/CA-3/api/"
// const baseURL = "http://localhost:8080/api/"

async function getTopics() {
  const topics = fetchURL(baseURL+"topic/all")
  return topics
}

async function getTopic(topicName) {
  const topic = fetchURL(baseURL+"topic/"+topicName)
  return topic
}

async function getSubjects() {
  const topics = fetchURL(baseURL+"topic/allSubjects")
  return topics
}

async function getSubject(topicName) {
  const topic = fetchURL(baseURL+"topic/subject/"+topicName)
  return topic
}

const methods = {
  getTopics,
  getTopic,
  getSubjects,
  getSubject
}

export default methods