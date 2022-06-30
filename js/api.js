
// RENDER ALL POSTS BOXES
const renderPosts = async () => {

    await fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => res.forEach(data => {
            const renderPost = document.querySelector('#render-posts');

            renderPost.innerHTML += `
            
            <div id="${data.id}" class="posts-box">
                <div class="bodyPostBox">
                    <h3>${data.title}</h3>
                    <span>${data.date}</span>
                    <p>${data.body}</p>
                    <img class="giphy-img mb-2 mt-2 gifima" type="image" src="${data.gif}" width="100%" height="350">
                </div>
                <div class="post-btns mb-3 mt-3 footerPostBox">
                        <div class="post-btns-icons">
                            <span class="post-icons likes" id="${data.id}">👍 <span style='color:whitesmoke;'>${data.emoji ? data.emoji.likes : '0'}</span></span>
                            <span class="post-icons smile" id="${data.id}">😊 <span style='color:whitesmoke;'>${data.emoji ? data.emoji.smile : '0'}</span></span>
                            <span class="post-icons happy" id="${data.id}">😂 <span style='color:whitesmoke;'>${data.emoji ? data.emoji.happy : '0'}</span></span>
                        </div>

                        <div id="${data.id}" class="post-btns-comment">Comments</div>
                    </div>
                <div id="render_comments_${data.id}" class="renderedCommentsSession mt-4 mb-2"></div>     
            </div>`
    }))

}

// SUBMIT POST
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

    const newToday = hours + " " + yyyy + '-' + mm + '-' + dd;


    fetch("https://community-blog-server.herokuapp.com/api/createBlogEntry", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": 13,
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

const submitCommentPost = (post_id) => {

    const commentTitle = document.querySelector('#comment_title').value
    const commentBody = document.querySelector('#comment_body').value

    const today = new Date();
    const d = new Date()
    const hours = String(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const newToday = hours + " " + yyyy + '-' + mm + '-' + dd;

    fetch("https://community-blog-server.herokuapp.com/api/createBlogComment", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": 3.1,
            "date": `"${newToday}"`,
            "title": `${commentTitle}`,
            "body": `${commentBody}`
        }),
    }).then(res => res.json())
        .then(res => {
            console.log(res)
        })

}

const submitEmojisReactions = (icon, postId) => {

    fetch("https://community-blog-server.herokuapp.com/api/updateEmoji", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": postId,
            "emoji": {
                "likes": 3,
            }
        }),
    }).then(res => res.json())
        .then(res => {
            
            console.log(res)
        })

}

//GENERATE FORM IN RENDER COMMENTS
const commentForm = (post_id) => {

    return `
            <div class="bodyPostBox">
                <div>
                    <h2>Make a comment!</h2>
                </div>
                <div class="">
                    <form id="">
                        <div class="">
                            <div class="form-box-inputs">
                                <input id="comment_title" class="" type="text" name="title" placeholder="Title"/>
                                <br>
                                <textarea id="comment_body" class="" name="postarea" rows="4" placeholder="Comment here!"></textarea>
                            </div>
                            <div class="commentBtnPost mt-2 mb-2"> 
                                <buttom id="${post_id}" class="comment-post" type="submit">Comment</buttom>
                            </div>
                        </div>
                    </form>
                </div>
            </div>`
}

// RENDER COMMENTS BELOW EACH POST
const renderComments = (post_id) => {

    const commentBlock = document.querySelector(`#render_comments_${post_id}`);
    commentBlock.innerHTML = ''
    commentBlock.innerHTML = commentForm(post_id)

    fetch(`https://community-blog-server.herokuapp.com/api/blog/${post_id}`)
        .then(response => response.json())
        .then(res => {
            if (res.comments !== undefined) {
                res.comments.forEach(commentData => {
                    commentBlock.innerHTML += `
                <div class="mb-4 mt-4 commentsBoxes">
                    <div>    
                        <h4 class="commentTitle">${commentData.title}</h4>
                        <span class="text-muted commentDate"> ${commentData.date}</span>
                    </div>
                    <br>
                    <div>
                        <p>${commentData.body}</p>
                    </div>
                </div>`

                })
            } else {
                commentBlock.innerHTML += `<p>No comments! Be the first one to comment!</p>`
            }
        })
}

// module.exports = {
//     renderPosts,
//     submitPost,
//     renderComments,
//     submitEmojisReactions
// } 
