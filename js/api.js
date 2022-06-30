const globalIdMaker = {}
const commentsIdGenerator = {}

const getRecentId = (e) => {
    fetch('https://community-blog-server.herokuapp.com/api/blog/')
        .then(response => response.json())
        .then(res => {
            globalIdMaker.postId = res.length
        })
}

console.log(globalIdMaker)

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
                            <span class="post-icons likes" id="${data.id}">👍 <span id="zero_${data.id}" style='color:whitesmoke;'>${data.emoji[0] ? data.emoji[0] : '0'}</span></span>
                            <span class="post-icons smile" id="${data.id}">😊 <span id="first_${data.id}" style='color:whitesmoke;'>${data.emoji[1] ? data.emoji[1] : '0'}</span></span>
                            <span class="post-icons happy" id="${data.id}">😂 <span id="second_${data.id}" style='color:whitesmoke;'>${data.emoji[2] ? data.emoji[2] : '0'}</span></span>
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
            "id": globalIdMaker.id + 1,
            "date": `"${newToday}"`,
            "title": `${title.value}`,
            "body": `${body.value}`,
            "gif": `${gif}`,
            "emoji": [
                0,
                0,
                0
            ],
            "comments": []
        }),
    }).then(res => res.json())
        .then(res => {
            console.log(res)
        })
}



const submitCommentPost = (post_id) => {

    fetch(`https://community-blog-server.herokuapp.com/api/blog/${post_id}`)
        .then(response => response.json())
        .then(res => {

            const commentLength = res.comments.length;
            const fixedDecimalId = res.comments[commentLength - 1].id + .1;
            const newId = +fixedDecimalId.toFixed(1)

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
                    "id": newId,
                    "date": `"${newToday}"`,
                    "title": `${commentTitle}`,
                    "body": `${commentBody}`
                }),
            }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    //renderJustPostedComments(res)
                })
        })

    

  

}

const submitEmojisReactions = (postId, index, quantity) => {

    fetch(`https://community-blog-server.herokuapp.com/api/blog/${postId}`)
        .then(response => response.json())
        .then(res => {

            // NEW ARRAY FOR PUSH EMOJI DATA
            const getEmojiData = []

            // LOOP THROUGH DATA FOR PUSH FRESH INSIDE NEW ARRAY
            res.emoji.forEach(data => {
                getEmojiData.push(data)
            })

            //GET INDEX (EMOJI) AND ADD QTY + 1
            getEmojiData[index] = quantity + 1

            // FETCH GETTING SPECIFIC POST REQUESTED
            fetch(`https://community-blog-server.herokuapp.com/api/updateEmoji/${postId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getEmojiData), // UPDATING WITH NEW DATA ARRAY
            }).then(res => res.json())
                .then(res => {
                    // GETTING TAGS THAT RENDER QUANTITY OF ICONS
                    const zero = document.querySelector(`#zero_${postId}`);
                    const first = document.querySelector(`#first_${postId}`);
                    const second = document.querySelector(`#second_${postId}`);

                    // UPDATING THEIR INNERTEXT QUANTITY
                    zero.innerText = res['req.body'][0]
                    first.innerText = res['req.body'][1]
                    second.innerText = res['req.body'][2]
                })
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

const renderJustPostedComments = (res) => {

    const commentBlock = document.querySelector(".commentsBoxes");

    commentBlock.innerHTML += `
                <div class="mb-4 mt-4 commentsBoxes">
                    <div>    
                        <h4 class="commentTitle">${res.title}</h4>
                        <span class="text-muted commentDate"> ${res.date}</span>
                    </div>
                    <br>
                    <div>
                        <p>${res.body}</p>
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

module.exports = {
    getRecentId,
    renderPosts,
    submitPost,
    renderComments,
    submitCommentPost,
    submitEmojisReactions
} 
