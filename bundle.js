(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const renderPosts = async () => {
    await fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => res.forEach(data => {
            const renderPost = document.querySelector('#render-posts');

            renderPost.innerHTML += `
            
            <div class="posts-box">
                <div>
                    <h3>${data.title}</h3>
                    <span>${data.date}</span>
                    <p>${data.body}</p>
                    <img class="giphy-img mb-2 mt-2 gifima" type="image" src="${data.gif}" width="100%" height="350">
                </div>
                <div class="post-btns">
                    <div class="post-btns-icons">
                        <span class="post-icons" id="like">👍</span>
                        <span class="post-icons" id="smile">😊</span>
                        <span class="post-icons" id="crysmile">😂</span>
                    </div>

                    <div id="${data.id}" class="post-btns-comment">Comments</div>
                </div>
                <div id="render_comments_${data.id}" class="mt-4 mb-2 bg-light">
               
                </div>
            </div>`
        }))
}


const submitPost = (e) => {

    e.preventDefault();

    const title = document.getElementById("title")
    const body = document.getElementById("post-context")
    const gif = document.querySelector('.giphy-img').src

    const today = new Date();
    const d = new Date()
    const hours = String(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const newToday = hours +" "+ yyyy + '-' + mm + '-' + dd;


    fetch("https://community-blog-server.herokuapp.com/api/createBlogEntry", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": 7,
            "date": `"${newToday}"`,
            "title": `${title.value}`,
            "body": `${body.value}`,
            "gif": `${gif}`
        }),
    }).then(res => res.json())
        .then(res => {
            console.log(res)
        })
}

const renderComments = (post_id) => {



    fetch(`https://community-blog-server.herokuapp.com/api/blog/${post_id}`)
        .then(response => response.json())
        .then(res => res.comments.forEach(commentData => {
        
            const commentBlock = document.querySelector(`#render_comments_${post_id}`);
            commentBlock.innerHTML += `
            
            <h4> ${commentData.title}</h3>
            <span> ${commentData.date}</span>
            <p> ${commentData.body}</p>
           

            `
        }))
}

const commentForm = () => {

}


exports = {
    renderPosts,
    submitPost,
    renderComments
} 

},{}]},{},[1]);
