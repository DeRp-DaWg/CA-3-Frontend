import { fetchURL, dataFactory } from "./fetcherUtils"

const baseURL = "https://math7.p.rapidapi.com/"
const key = "8c81539974msh7d9376fb1d7e115p118063jsn874bc108c4c4"

async function getCalculator(calculatorURL) {
  const topics = fetchURL(baseURL+"topic/all")
  return topics
}

const methods = {
  getTopics,
  getTopic
}

export default methods
