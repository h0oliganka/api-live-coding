import { initEventListeners, newDate } from "./script.js";
import { fetchAndRenderCommentsTwo } from "./script.js";
import { postComments } from "./api.js";
import { renderLoginComponent } from "./login.js";

export let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
token = null;

// рендер функция
export const renderComments = () => {
  const appEl = document.getElementById("app")
  if (!token) {
    
    renderLoginComponent({ appEl, setToken: (newToken) =>{
    token = newToken
    },
    fetchAndRenderCommentsTwo,
    });

    

    return;
  }
  const commentsHtml = window.comments.map((comment, index) => {
    return ` <li class="comment" data-text="${comment.text}" data-name="${comment.name}"
    data-date= "${comment.date}" data-counter="${comment.likesCounter}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div  class="comment-text" >
             ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span  class="likes-counter" data-counter="${comment.likesCounter}">${comment.likesCounter}</span>
              <button class="like-button" ></button>
            </div>
          </div>
        </li>
        <div class="autorization-link"><h3 class="comment-header">Чтобы добавить комментарий,&nbsp; <button id="login-form-button" class="comment-header login-form-button">авторизуйтесь</button></h3></div>`;
    }).join('');
    
    const appHtml = `<div class="container">
       <ul id="comments" class="comments">${commentsHtml} </ul>
    <div id= "addFormLoading" class="addFormLoading">
      <div id= "add-form" class="add-form">
        <input
          type="text"
          id="name-input"
          class="add-form-name"
          placeholder="Введите ваше имя"
        />
        <textarea
          type="textarea"
          id="comment-input"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>
      </div>`
initEventListeners();

appEl.innerHTML = appHtml;

const buttonElement = document.getElementById("add-button");
const commentsElement = document.getElementById("comments");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
let addForm = document.getElementById("add-form");
const loginForm = document.getElementById("login-form-button")

loginForm.addEventListener("click", renderLoginComponent())

// проверка ввода
buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove('error');

  if (nameInputElement.value === '') {
    nameInputElement.classList.add('error');
    return;
  }

  commentInputElement.classList.remove('error');

  if (commentInputElement.value === '') {
    commentInputElement.classList.add('error');
    return;
  }

  // рендер нового коммента
  comments.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    date: newDate(),
    text: commentInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    likesCounter: 0,
  });
  // addForm.parentNode.appendChild(addFormLoading, addForm);

  // POST
  const postAndRenderComments = () => {
    // addForm.parentNode.appendChild(addFormLoading, addForm);

    return postComments({ nameInputElement, commentInputElement })
      .then(() => {
        // return addFormLoading.parentNode.appendChild(addForm, addFormLoading);
      })
      .then(() => {
        return fetchAndRenderCommentsTwo();

      }).then(() => {
        // return addFormLoading.parentNode.appendChild(addForm, addFormLoading);

      }).catch((error) => {
        // addFormLoading.parentNode.appendChild(addForm, addFormLoading);
        alert('Ошибка интернет соединения');
        console.warn(error);
      });
  }
  postAndRenderComments();
  renderComments();
  initEventListeners();
});
}