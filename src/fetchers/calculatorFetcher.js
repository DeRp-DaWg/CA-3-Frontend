import { fetchURL, dataFactory } from "./fetcherUtils"

const baseURL = "https://math7.p.rapidapi.com"
const key = "8c81539974msh7d9376fb1d7e115p118063jsn874bc108c4c4"

async function getCalculator(calculatorURL, parameters) {
  let queryParams = "?"
  parameters.forEach(param => {
    let valueString = param.formula
    const keys = Object.keys(param.values)
    const values = Object.values(param.values)
    for (let i = 0; i < keys.length; i++) {
      valueString = valueString.replaceAll(keys[i], values[i])
    }
    queryParams += `${param.keyword}=${encodeURIComponent(valueString)}&`
  })
  queryParams = queryParams.substring(0, queryParams.length-1)
  const headers = {"X-RapidAPI-Key": key}
  const result = fetchURL(baseURL+calculatorURL+queryParams, dataFactory("GET", null, headers))
  return result
}

const methods = {
  getCalculator
}

export default methods
