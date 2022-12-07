import { fetchURL, dataFactory, backendAPIURL } from "./fetcherUtils"

// const baseURL = "http://onebrightcreation.com:8081/CA-3/api/"

async function getTopics() {
  const topics = fetchURL(backendAPIURL+"topic/all")
  return topics
}

async function getTopicByName(topicName) {
  const topic = fetchURL(backendAPIURL+"topic/"+topicName)
  return topic
}

async function sendTopic(topicDTO, subject, method) {
  const result = fetchURL(backendAPIURL+"topic/"+subject, dataFactory(method, topicDTO))
  return result
}

async function getSubjects() {
  const topics = fetchURL(backendAPIURL+"topic/allSubjects")
  return topics
}

async function getSubject(topicName) {
  const topic = fetchURL(backendAPIURL+"topic/subject/"+topicName)
  return topic
}

const methods = {
  getTopics,
  getTopicByName,
  sendTopic,
  getSubjects,
  getSubject
}

export default methods