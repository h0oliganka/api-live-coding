import { login } from "./api.js";
import{fetchAndRenderCommentsTwo} from "./script.js";
import {renderComments} from "./renderFunction.js";

export function renderLoginComponent({ appEl, setToken, }){
    const  appHtml = `<div class="container">
    <div class="container-login">
          <div id= "add-form"  class="add-form">
            <input
              type="text"
              id="login-input"
              class="add-form-name"
              placeholder="Логин"
            />
            <br>
            <input 
            type="password"
            id="name-input" 
            class="add-form-name" 
            placeholder="Введите пароль" 
            />
            <div class="add-form-row">
              <button id="login-button" class="add-form-button">Войти</button>
            </div>
          </div>
          </div>
         </div>`
        appEl.innerHTML = appHtml;
        document.getElementById('login-button').addEventListener('click',() => {
        login
        ({
            login: "admin", 
            password: "admin",
        })
        .then((user) => {
        console.log(user);
        setToken(`Bearer ${user.user.token}`);
        renderComments();
        fetchAndRenderCommentsTwo(); 
        })
        })
}