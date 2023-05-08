import { newDate } from "./script.js";
import { renderComments, token } from "./renderFunction.js";
import { initEventListeners } from "./script.js";

const commentsElement = document.getElementById("comments");
export let host = "https://webdev-hw-api.vercel.app/api/v1/dasha-salova/comments";


// GET
export function getCommentsLoading(token) {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    }
    .then((response) => {
      if (response.status === 401) {
        token = prompt("Введите верный пароль");
        fetchTodosAndRender();
        throw new Error("Нет авторизации");
      }
      return response.json();
    })
  }).then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {

      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: newDate(),
          text: comment.text,
          likesCounter: 0,

        }

      })
      window.comments = appComments;
      renderComments();
      initEventListeners();
      console.log(window.comments);
    });

  }).then(() => {
    return commentsLoading.parentNode.replaceChild(commentsElement, commentsLoading);

  }).catch((error) => {

    alert('Кажется, у вас сломался интернет, попробуйте позже');
    console.warn(error);
  });
}

// 2 GET
export function getComments(token) {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    const jsonPromise = response.json();

    jsonPromise.then((responseData) => {
      let appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: newDate(),
          text: comment.text,
          likesCounter: 0,

        }

      })
      comments = appComments;
      renderComments();
      initEventListeners();
      console.log(window.comments);
    });

  })
}



// POST
export function postComments({ nameInputElement, commentInputElement, token }) {
  return fetch(host, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      name: nameInputElement.value,
      text: commentInputElement.value,
      date: newDate(),
      likesCounter: 0,
      forceError: true,
    }),
  }).then((response) => {
    if (response.status === 201) {
      nameInputElement.value = "";
      commentInputElement.value = "";
      return response.json();
    }
    if (response.status === 500) {
      throw new Error('Сервер сломался, попробуй позже');
    } if (response.status === 400) {
      alert("Имя и комментарий должны быть не короче 3 символов");
    }
  })
}

export function login(login, password) {
  return fetch( "https://webdev-hw-api.vercel.app/api/user/login", {
      method: "POST",
      body: JSON.stringify({ 
      login,
      password,
      token,
      })
  }).then((response) => {
        return response.json();
    })
  }
