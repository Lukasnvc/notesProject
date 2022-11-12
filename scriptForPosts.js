const postForm = document.querySelector('#newpost');
const close = document.querySelector('#close');
const newPost = document.querySelector('#newPost');
const postBtn = document.querySelector('#submit');
const newPostBtn = document.querySelector('#newPostBtn');
const h2 = document.querySelector('#h2');
const logout = document.querySelector('#logout');
const container = document.querySelector('#posts');

logout.addEventListener('click', () => {
  localStorage.clear();
  location.href = 'index.html';
})

newPostBtn.addEventListener('click', () => {
  postForm.style.display = 'block';
  newPostBtn.style.display = 'none';
})

close.addEventListener('click', () => {
  postForm.style.display = 'none';
  newPostBtn.style.display = 'block';
})



const getData = () => {
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
.then((result) => {
  console.log('Data got from GET: ', result.data)
  return result.data
})
.then((data)=>{
  console.log('Type or data getting: ', typeof data)
  filter(data)
})
}

getData()

const sendUppdatedPosts = (name, id, posts) => {
fetch(`https://testapi.io/api/lukasnvc/resource/NotesProject/${id}`,
{
  method: 'PUT',
  headers: {
    'Content-Type':
    'application/json'
  },
  body: JSON.stringify({
    username: `${name}`,
    post: `${posts}`
  }) 
})
.then((response) => {
  if (response.ok) {
    return response.json()
  }
})
.then((result) => {
  console.log('Fetching data : ', result);
  container.replaceChildren()
  getData()
})
}

const arr = JSON.parse(localStorage.getItem('user'));
const lastIndex = arr.length;
const id = arr[lastIndex-1];
console.log('User id :', id)


const filter = (users) => {
  let user
users.forEach(element => {
  if(element.id==id) {
    user=element
    console.log('Found user posts by id :',user);
    draw(user);
    makePost(user)
  }
});
}

const draw = (user) => {
  const userPostsArr = JSON.parse(user.post) || []
  userPostsArr.forEach(element => {
    const div = document.createElement('div');
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.textContent= 'Delete';
    div.setAttribute('class', 'card');
    div.textContent=element;
    div.appendChild(deleteBtn)
    container.appendChild(div)
    
  });

}

const makePost = (item) => {
postBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const allPosts = item.post;
  
  const currentPost = newPost.value;

  const postsArr = JSON.parse(item.post) || []
  console.log('User posts in makePost :', allPosts, typeof allPosts, ', New post :', currentPost);
  postsArr.push(currentPost);
  const jsonPostsArr = JSON.stringify(postsArr)
  sendUppdatedPosts(item.username, id, jsonPostsArr)
  postForm.style.display = 'none';
  newPostBtn.style.display = 'block';
})
}