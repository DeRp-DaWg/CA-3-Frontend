import topicFetcher from "./fetchers/topicFetcher"
import calculatorFetcher from "./fetchers/calculatorFetcher"

async function topicLoader({params}) {
  const topic = await topicFetcher.getTopicByName(params.topicName)
  if (topic.code === 500 || topic.code === 404) {
    throw new Response("Not Found", { status: 404 })
  }
  return {topic}
}

async function calculatorLoader({params}) {
  const calculator = await calculatorFetcher.getCalculatorByName(params.calculatorName)
  if (calculator.code === 500 || calculator.code === 404) {
    throw new Response("Not Found", { status: 404 })
  }
  return {calculator}
}

async function topicEditLoader({params}) {
  const topic = await topicFetcher.getTopicByName(params.topicName)
  if (topic.code === 500 || topic.code === 404) {
    throw new Response("Not Found", { status: 404 })
  }
  const {calculatorNames} = await calculatorNamesLoader()
  return {method: "PUT", calculatorNames}
}

async function topicCreateLoader() {
  const topic = {name: "", description: "", example: "", formula: "", calculator: {name: null}}
  const {calculatorNames} = await calculatorNamesLoader()
  return {topic, method: "POST", calculatorNames}
}

async function calculatorEditLoader({params}) {
  const calculator = await calculatorFetcher.getCalculatorByName(params.calculatorName)
  if (calculator.code === 500 || calculator.code === 404) {
    throw new Response("Not Found", { status: 404 })
  }
  return {calculator, method: "PUT"}
}

async function calculatorCreateLoader() {
  const calculator = {name: "", calculatorURL: "", calculatorFields: []}
  return {calculator, method: "POST"}
}

async function calculatorNamesLoader() {
  const calculatorNames = await calculatorFetcher.getAllCalculatorNames()
  if (calculatorNames.code === 500 || calculatorNames.code === 404) {
    throw new Response("Not Found", { status: 404 })
  }
  return {calculatorNames}
}

const loaders = {
  topicLoader,
  calculatorLoader,
  calculatorNamesLoader,
  topicCreateLoader,
  calculatorEditLoader,
  calculatorCreateLoader,
}

export default loaders
