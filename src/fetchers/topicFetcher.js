import { fetchURL, dataFactory, backendAPIURL } from "./fetcherUtils"
import apiFacade from "./apiFacade"

// const baseURL = "http://onebrightcreation.com:8081/CA-3/api/"

async function getTopics() {
  const topics = fetchURL(backendAPIURL+"topic/all")
  return topics
}

async function getTopicByName(topicName) {
  const topic = fetchURL(backendAPIURL+"topic/"+topicName)
  return topic
}

async function sendTopic(topicDTO, subject, isNewEntry) {
  let method = "PUT"
  if (isNewEntry) {
    method = "POST"
  }
  const headers = {"x-access-token": apiFacade.getToken()}
  const result = fetchURL(backendAPIURL+"topic/"+subject, dataFactory(method, topicDTO, headers))
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