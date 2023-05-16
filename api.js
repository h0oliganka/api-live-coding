import { renderComments } from "./renderFunction.js";
import { initEventListeners } from "./script.js";
import { format } from "date-fns";

export let host = "https://webdev-hw-api.vercel.app/api/v1/dasha-salova/comments";

// GET
export function getComments() {
  return fetch(host, {
    method: "GET",
    headers: {

    },
  }).then((response) => {
    const jsonPromise = response.json();

    jsonPromise.then((responseData) => {
      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: format(new Date(comment.date), 'yyyy.MM.dd hh:mm:ss'),
          text: comment.text,
          likesCounter: 0,
        }
      })
      comments = appComments;
      renderComments();
      initEventListeners();
      console.log(window.comments);
    });
  }).catch((error) => {

    alert('Кажется, у вас сломался интернет, попробуйте позже');
    console.warn(error);
  });
}

// POST
export function postComments({ nameInputElement, commentInputElement, token }) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: _.capitalize(nameInputElement.value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      text: commentInputElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      date: format(new Date(), 'yyyy.MM.dd hh:mm:ss'),
      likesCounter: 0,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    }
    if (response.status === 500) {
      alert('Сервер сломался, попробуй позже');
      throw new Error('Сервер сломался, попробуй позже');
    }
    if (response.status === 400) {
      alert("Имя и комментарий должны быть не короче 3 символов");
    }
  })
}

//вход
export function loginUser({ login, password, token }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    })
  }).then((response) => {
    if (response.status === 400) {
      alert('Неверный логин или пароль')
      throw new Error('Неверный логин или пароль');
    }
    return response.json();
  })
}

//регистрация
export function registerUser({ name, login, password, token }) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
      token,
    })
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Такой пользователь уже существует');
    }
    return response.json();
  })
}
