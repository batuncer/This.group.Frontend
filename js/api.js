const form = document.getElementById('form')
form.addEventListener('submit', submitPost)

function submitPost(e) {
    e.preventDefault();
    const title = document.getElementById("title")
    const body = document.getElementById("post-context")
   
    console.log(body.value)

    console.log(title.value);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    let newToday = dd + '/' + mm + '/' + yyyy;
    console.log(newToday)
    fetch("https://community-blog-server.herokuapp.com/api/createBlogEntry", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify ({
                "id" : 5,
                "date": `"${newToday}"`,
                "title": `${title.value}`,
                "body": `${body.value}`
               
                
               
  }),
    }).then(res => res.json()).then(res => console.log(res))

  

}

