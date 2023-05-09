import { login } from "./api.js";
import{fetchAndRenderCommentsTwo} from "./script.js";
import {renderComments,} from "./renderFunction.js";



export function renderLoginComponent( appEl, setToken){
    const  appHtml = `<div class="container">
    <div class="login-form">
          <div id= "add-form"  class="add-form">
          <h3 class="login-form-title">Форма входа</h3>
            <input
              type="text"
              id="login-input"
              class="login-form-login"
              placeholder="Логин"
            />
            <br>
            <input 
            type="password"
            id="name-input" 
            class="login-form-password" 
            placeholder="Введите пароль" 
            />
            <div class="add-form-row login-form-enter">
              <button id="login-button" class="add-form-button">Войти</button>
            </div>
          </div>
          </div>
         </div>`
        const loginButton = document.getElementById("login-button")
        loginButton.addEventListener('click',() => {
        login
        ({
            login: "admin", 
            password: "admin",
            token: "asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k",
        })
        .then((user) => {
        console.log(user);
        setToken(`Bearer ${user.user.token}`);
        renderComments();
        fetchAndRenderCommentsTwo(); 
        })
        })
}