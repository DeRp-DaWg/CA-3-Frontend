import { fetchURL, dataFactory, backendAPIURL } from "./fetcherUtils"
import apiFacade from "./apiFacade"

const baseThirdPartyAPIURL = "https://math7.p.rapidapi.com"
const key = "8c81539974msh7d9376fb1d7e115p118063jsn874bc108c4c4"

async function getCalculation(calculatorURL, parameters) {
  let queryParams = "?"
  console.log(parameters)
  parameters.forEach(param => {
    let valueString = ""
    if (param.isSingleInput) {
      valueString = param.value
    } else {
      valueString = param.formula
      const keys = Object.keys(param.values)
      const values = Object.values(param.values)
      for (let i = 0; i < keys.length; i++) {
        valueString = valueString.replaceAll(keys[i], values[i])
      }
    }
    queryParams += `${param.keyword}=${encodeURIComponent(valueString)}&`
  })
  queryParams = queryParams.substring(0, queryParams.length-1)
  const headers = {"X-RapidAPI-Key": key}
  const result = fetchURL(baseThirdPartyAPIURL+calculatorURL+queryParams, dataFactory("GET", null, headers))
  return result
}

async function sendCalculator(calculatorDTO, isNewEntry) {
  // const headers = {"X-RapidAPI-Key": key}
  let method = "PUT"
  if (isNewEntry) {
    method = "POST"
  }
  const headers = {"x-access-token": apiFacade.getToken()}
  const result = fetchURL(backendAPIURL+"calculator", dataFactory(method, calculatorDTO, headers))
  return result
}

async function getAllCalculatorNames() {
  return fetchURL(backendAPIURL+"calculator")
}

async function getCalculatorByName(name) {
  return fetchURL(backendAPIURL+"calculator/"+name)
}

async function deleteCalculator(name) {
  const headers = {"x-access-token": apiFacade.getToken()}
  return fetchURL(backendAPIURL+"calculator/"+name, dataFactory("DELETE", null, headers))
}

const methods = {
  getCalculation,
  sendCalculator,
  getAllCalculatorNames,
  getCalculatorByName,
  deleteCalculator
}

export default methods
