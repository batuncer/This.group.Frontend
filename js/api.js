const renderPosts = () => {

    fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => res.forEach(data => {
            const renderPost = document.querySelector('#render-posts');

            renderPost.innerHTML += `
            
            <div class="posts-box">
                <div>
                    <h3>${data.title}</h3>
                    <span>${data.date}</span>
                    <p>${data.body}</p>
                    <iframe src="${data.gif}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
                <div class="post-btns">
                    <div class="post-btns-icons">
                        <span class="post-icons" id="like">👍</span>
                        <span class="post-icons" id="smile">😊</span>
                        <span class="post-icons" id="crysmile">😂</span>
                    </div>

                    <div class="post-btns-comment">Comments</div>
                </div>
               
            </div>


            `
        }))


}




exports = {
    renderPosts
} 
