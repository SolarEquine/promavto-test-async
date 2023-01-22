const url = "https://jsonplaceholder.typicode.com/posts";
const btn = document.querySelector(".btn")
const postsElem = document.querySelector(".posts");
const loader = document.createElement('div');
loader.classList.add("loader");
let posts = []
btn.addEventListener("click", ()=>{fetchPosts(url)});

async function fetchPosts(url){
    postsElem.innerHTML = "";
    postsElem.prepend(loader);
    try{
        const responce =  await fetch(url, {cache: "no-store"});
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

async function fetchComments(url, postElem){
    const commentsElem = postElem.querySelector(".comments");
    commentsElem.innerHTML = "";
    commentsElem.prepend(loader);
    let comments = [];
    try{
        const responce = await fetch(url, {cache: "no-store"});
        comments = await responce.json();
    }
    catch(e){
        alert(e);
    }
    finally{
        commentsElem.removeChild(loader);
        updateComments(commentsElem, comments);
    }
}

function updatePosts(){
    posts.forEach(post => {
        const postElem = document.createElement("div");
        const titleElem = document.createElement("div");
        const bodyElem = document.createElement("div");
        const footerElem = document.createElement("div");
        const commentBTN = document.createElement("button");
        const commentsElem = document.createElement("div");

        postElem.classList.add("post");
        titleElem.classList.add("post_title");
        bodyElem.classList.add("post_body");
        footerElem.classList.add("post_footer");
        commentBTN.classList.add("comment_button");
        commentsElem.classList.add("comments");

        commentBTN.innerHTML = "Загрузить комментарии"
        commentBTN.addEventListener("click", ()=>{
            fetchComments(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`, postElem)
        });

        titleElem.innerHTML = post.title;
        bodyElem.innerHTML = post.body;
        footerElem.appendChild(commentBTN);

        postElem.appendChild(titleElem);
        postElem.appendChild(bodyElem);
        postElem.appendChild(footerElem);
        postElem.appendChild(commentsElem);

        postsElem.appendChild(postElem);
    });
}

function updateComments(commentsElem, comments){
    comments.forEach(comment =>{
        const nameElem = document.createElement("div");
        const bodyElem = document.createElement("div");
        const emailElem = document.createElement("div");
        const commentElem = document.createElement("div");

        nameElem.innerHTML = comment.name;
        bodyElem.innerHTML = comment.body;
        emailElem.innerHTML = comment.email;

        nameElem.classList.add("comment_name");
        bodyElem.classList.add("comment_body");
        emailElem.classList.add("comment_email");
        commentElem.classList.add("comment");

        commentElem.innerHTML = `<div class="comment_header">${nameElem.outerHTML}${emailElem.outerHTML}</div><div class="comment_body">${bodyElem.outerHTML}</div>`;

        commentsElem.appendChild(commentElem);
    })
}
