const renderPosts = () => {

    fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => res.forEach(data => {
            const renderPost = document.querySelector('#render-posts');

            renderPost.innerHTML += `
            
            <div>
                <div>
                    <h3>${data.title}</h3>
                    <span>${data.date}</span>
                    <p>${data.body}</p>
                    <iframe src="${data.gif}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
                <div>
                   ${data.comments}
                </div>
            </div>


            `
        }))


}




exports = {
    renderPosts
} 
