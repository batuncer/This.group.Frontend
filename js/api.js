// DATING
const today = new Date();
const d = new Date()
const hours = String(d.getHours() + ":" + d.getMinutes());
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();


// RENDER ALL POSTS BOXES
const renderPosts = async () => {
    await fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => res.reverse().forEach(data => {

            const renderPost = document.querySelector('#render-posts');

            renderPost.innerHTML += `
            
            <div id="${data.id}" class="posts-box">
                <div class="bodyPostBox">
                    <h3 style="margin-bottom:0;">${data.title}</h3>
                    <span style="color:gray; margin-top:0; margin-bottom:2px;">${data.date}</span>
                    <p style="margin-top:1rem;">${data.body}</p>
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
                <div style="display: none;" id="render_comments_${data.id}" class="renderedCommentsSession mt-4 mb-2"></div>     
            </div>`
        }))
}

// SUBMIT POST
const submitPost = (e) => {

    e.preventDefault();

    fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => {
            const newPostId = res.length

            const title = document.getElementById("title")
            const body = document.getElementById("post-context")
            const gif = document.querySelector('.giphy-selected').src

            const newToday = `Posted at: ${hours} on ${yyyy}-${mm}-${dd}`


            fetch("https://community-blog-server.herokuapp.com/api/createBlogEntry", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": newPostId + 1,
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
                    location.reload()
                })

        })
}





const submitCommentPost = (post_id) => {

    fetch(`https://community-blog-server.herokuapp.com/api/blog/${post_id}`)
        .then(response => response.json())
        .then(res => {
    
            let newId;

            if (res.comments !== undefined) {
                const commentLength = res.comments.length;
                const fixedDecimalId = res.comments[commentLength - 1].id + .1;
                newId = +fixedDecimalId.toFixed(1)
            } else {
                newId = post_id + .1
            }

            const commentTitle = document.querySelector('#comment_title').value
            const commentBody = document.querySelector('#comment_body').value

            const newToday = `Commented at: ${hours} on ${yyyy}-${mm}-${dd}`

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
                    //renderJustPostedComments(post_id, res)
                    renderComments(post_id)
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

// GONNA KEEP THIS JUST IN CASE BUT WE DONT NEED THIS ANYMORE ONCE IM CALLING THE MAIN RENDER COMMENT FUNCTION

// const renderJustPostedComments = (postId, res) => {


//     const commentBlock = document.querySelector(`#render_comments_${postId}`);

//     commentBlock.innerHTML += `
//             <div class="mb-4 mt-4 commentsBoxes">
//                 <div>
//                     <div>    
//                         <h4 class="commentTitle">${res.title}</h4>
//                         <span class="text-muted commentDate"> ${res.date}</span>
//                     </div>
//                     <br>
//                     <div>
//                         <p>${res.body}</p>
//                     </div>
//                 </div>
//             </div>`

// }

// RENDER COMMENTS BELOW EACH POST
const renderComments = (post_id) => {

    const commentBlock = document.querySelector(`#render_comments_${post_id}`);
    commentBlock.innerHTML = ''
    commentBlock.innerHTML = commentForm(post_id)

    fetch(`https://community-blog-server.herokuapp.com/api/blog/${post_id}`)
        .then(response => response.json())
        .then(res => {
            if (res.comments !== undefined) {
                res.comments.reverse().forEach(commentData => {
                    commentBlock.innerHTML += `
                <div class="mb-4 mt-4 commentsBoxes">
                    <div>    
                        <h4 class="commentTitle">${commentData.title}</h4>
                        <span class="text-muted text-white commentDate"> ${commentData.date}</span>
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


const mostPopularPosts = (e) => {

    const mostPopulars = document.querySelector('#render-populars')
    mostPopulars.innerHTML = ''
    let counter = 1


    mostPopulars.innerHTML = `

    <div class="modal-header">
        <h5 class="modal-title text-white" id="staticBackdropLabel">${e} Rank</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>`

    fetch(`https://community-blog-server.herokuapp.com/api/${e}`)
        .then(res => res.json())
        .then(res => res.reverse().forEach(popular => {

            mostPopulars.innerHTML += `
            <div class="modal-body">
                <div class="mb-3 text-white">
                    <h3 data-bs-dismiss="modal" aria-label="Close"><span>#${counter++}</span> - <a style="text-decoration:none; color:white;" href="#${popular.id}">${popular.title}</a></h3>
                    <span>${popular.date}</span>
                </div>
            </div>
        `
        }))
}

module.exports = {
    renderPosts,
    submitPost,
    renderComments,
    submitCommentPost,
    submitEmojisReactions,
    mostPopularPosts
} 
