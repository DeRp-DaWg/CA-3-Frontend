import { useState } from "react";

// const URL = "http://onebrightcreation.com:8081/CA-3";
const URL = "http://localhost:8080/CA_3_war_exploded";
 
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}
 
function apiFacade() {
 /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/
 const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
// const loggedIn = () => {
//   const loggedIn = getToken() != null;
//   return loggedIn;
// }
const logout = () => {
  localStorage.removeItem("jwtToken");
  setLog(false);
  setUser("No user");
}

let user = "No user";

let loggedIn = false;


const setUser = (userResult) => {
  user = userResult;
}

const getUser = () => {
  return user;
}

const setLog = (setLog) => {
  loggedIn = setLog;
}

const getLog = () => {
  return loggedIn;
}


const login = (user, password) => {
    const options = makeOptions("POST", true,{username: user, password: password });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then(res => {
        setToken(res.token);
        setUser(res.username);
        setLog(true);
      })
}

const createUser = async (user, password) => {
    const options = makeOptions("POST", false,{username: user, password: password});
    await fetch(URL + "/api/user/create", options)
    .then(handleHttpErrors);
    return login(user, password);
}

const createTopic = async (name, description, example, formula, calculatorURL, calcName, tags, keyword, calcFormula, isSingleInput) => {
  const options = makeOptions("POST", false,{name: name,
  description: description,
  example: example,
  formula: formula,
  calculatorURL: calculatorURL,
  calcName: calcName,
  tags: tags,
  keyword: keyword,
  calcFormula: calcFormula,
  isSingleInput: isSingleInput});
  return fetch(URL + "/api/topic", options)
  .then(handleHttpErrors);
}

const updateScore = (value) => {
    const options = makeOptions("PUT", true,{isCorrect: value});
    return fetch(URL + "/api/info", options)
    .then(handleHttpErrors);
}

const fetchData = () => {
  const options = makeOptions("GET",true); //True add's the token
   return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
}

const getHighscores = async () => {
    let users = [];
    await fetch(URL + "/api/info/highscores?max=10",
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    })
    .then(handleHttpErrors)
    .then(res => {
      for(const ele of res){
        users.push({username: ele.username, highscore: ele.highscore});
      }
    });
        // .then(res => {return JSON.stringify(res)});
    return users;
}

const getJokes = async () => {
  let jokes = [];
  await fetch(URL + "/api/jokes",
  {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      'Accept': 'application/json',
    }
  })
  .then(handleHttpErrors)
  .then(res => {
    for(const ele of res){
      jokes.push({name: ele.name, joke: ele.joke, answer: false});
    
    }
  });
  return jokes;
}

const makeOptions= (method,addToken,body) =>{
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }
 return {
     makeOptions,
     getToken,
     getLog,
     setToken,
     login,
     logout,
     fetchData,
     getUser,
     createUser,
     createTopic
 }
}
const facade = apiFacade();
export default facade;
