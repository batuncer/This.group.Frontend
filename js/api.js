const renderPosts = () => {

    fetch('https://community-blog-server.herokuapp.com/api/blog')
        .then(response => response.json())
        .then(res => console.log(res))

}

renderPosts()
