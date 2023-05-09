import { loginUser } from "./api.js";
import{fetchAndRenderCommentsTwo} from "./script.js";
import {renderComments,} from "./renderFunction.js";

export function renderLoginComponent({ appEl, setToken }){
  const appHtml = `<div class="container">
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
            id="password-input" 
            class="login-form-password" 
            placeholder="Введите пароль" 
            />
            <div class="add-form-row login-form-enter">
              <button id="login-button" class="add-form-button">Войти</button>
            </div>
          </div>
          </div>
         </div>`
         appEl.innerHTML = appHtml;
         document.getElementById('login-button').addEventListener('click',() =>{
          const login = document.getElementById('login-input').value; 
          const password = document.getElementById('password-input').value;
          if (!login) {
            alert("Введите логин")
            return;
           }
          if (!password) {
           alert("Введите пароль")
           return;
          }
           loginUser({login:login, 
           password:password,
         }).then((user) => {
           console.log(user);
           setToken(`Bearer ${user.user.token}`);
           renderComments();
           fetchAndRenderCommentsTwo(); 
         })
    })
}