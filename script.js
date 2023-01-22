const url = "https://jsonplaceholder.typicode.com/posts";
const btn = document.querySelector(".btn")
const postsElem = document.querySelector(".posts");
const loader = document.createElement('div');
loader.classList.add("loader");
let posts = []
btn.addEventListener("click", ()=>{fetchPosts(url)});
async function fetchPosts(url){
    try{
        postsElem.prepend(loader);
        const responce =  await fetch(url);
        posts = await responce.json();
    }
    catch(e){
        alert(e)
    }
    finally{
        postsElem.removeChild(loader);
        updatePosts();
    }
}

function updatePosts(){
    postsElem.innerHTML = "";
    posts.forEach(post => {
        const title = post.title;
        const body = post.body;
        const postElem = document.createElement("div");
        const titleElem = document.createElement("div");
        const bodyElem = document.createElement("div");
        postElem.classList.add("post");
        titleElem.classList.add("post_title");
        bodyElem.classList.add("post_body");
        titleElem.innerHTML = title;
        bodyElem.innerHTML = body;
        postElem.appendChild(titleElem);
        postElem.appendChild(bodyElem);
        postsElem.appendChild(postElem);
    });
}
