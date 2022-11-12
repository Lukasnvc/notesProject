const loginUsername = document.querySelector('#usernameLogin');
const loginPassword = document.querySelector('#passwordLogin');
const loginBtn = document.querySelector('#submit1');
const login = document.querySelector('#login');
const error = document.querySelector('#error');

// Register
const registerBtn = document.querySelector('#registerBtn');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const submit = document.querySelector('#submit');
const close = document.querySelector('#close');
const registerForm = document.querySelector('#register');
const h3 = document.querySelector('#registerH3');

//login
  const getUser = () => {
   fetch('https://testapi.io/api/lukasnvc/resource/NotesProject',
   {
    method: 'GET',
    headers: {
    'Content-Type':
    'application/json'
    }
    })
   
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })  
     .then(data => {
      console.log(data)
      return data.data
    }).then(users => {
      console.log(users)
      checkUser(users)
    } )
  }
  
  getUser()

 

  const checkUser = (data) => {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const user = loginUsername.value+loginPassword.value;
    data.forEach(element => {
      console.log(element.username)
      if (element.username===user){
        console.log(element)
        pushUser(element);
        location.href = 'posts.html';
      } else {
        loginPassword.value='';
        error.textContent= "Wrong password or no such user"
      }
    })
  })
  }

  const pushUser = (user) => {
    
    let arr=JSON.parse(localStorage.getItem('user')) || [];
    arr.push(user.id);

    console.log(user, arr)
    localStorage.setItem('user', JSON.stringify(arr));
  }
//login

//register
registerBtn.addEventListener('click', (e) => {
  e.preventDefault()
  registerForm.style.display= 'block';
})

close.addEventListener('click', (e) => {
  e.preventDefault()
  registerForm.style.display= 'none';
})

const register = (valueUsername) => {
  fetch('https://testapi.io/api/lukasnvc/resource/NotesProject',
{
  method: 'POST',
  headers: {
    'Content-Type':
    'application/json'
  },
  body: JSON.stringify({
    username: `${valueUsername}`
  }) 
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
  console.log(result);
  location.reload()
})
}

  submit.addEventListener('click', (e) => {
    e.preventDefault()
    let valueUsername
    if (password.value===password2.value) {
    valueUsername= username.value + password.value;
    console.log(valueUsername);
    register(valueUsername)
    registerForm.style.display= 'none';
  } else {
    h3.textContent="Password don't match";
    h3.style.color= "red";
    loginPassword.value='';
  }
  })
