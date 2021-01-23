// import { React, useState, useContext } from 'react';
// import styled from 'styled-components';
// import { login } from '../utils/login';

// import { UserContext } from '../utils/UserContext';

// const InputStyles = styled.div`
// .form {
//     display: flex;
//     flex-direction:column;
//     align-items: center;
//     justify-content: center;
// }
// .form input {
// margin: 10px;
// }
// `

// export const LoginPage = () => {

//     const [username, setUsername] = setState('')
//     const [password, setPassword] = setState('')


//     function handleFormSubmit(event) {
//         event.preventDefault();
//         if (username && password) {
//             API.signUp({
//                 username: username,
//                 password: password
//             })
//                 .then(res => window.location.href = '/login').catch(err => console.log(err))
//         }
//     }


//     // const { user, setUser } = useContext(UserContext);

//     return (
//         <InputStyles>
//             <div className="form">

//                 <div>{user}</div>
//                 <div class="login">
//                     <h1>Login</h1>
//                     <input type="text" placeholder="Username" onChange={e.target.value} />
//                     <input type="password" placeholder="Password" onChange={e.target.value} />
//                     <button>Login</button>
//                 </div>
//             </div>
//         </InputStyles >
//     )
// }