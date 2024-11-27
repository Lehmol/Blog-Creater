const container = document.querySelector(".blogs");
const searchForm = document.querySelector(".search");

// Create render posts function
const renderPosts = async (term) => {
    let uri = 'http://localhost:3000/posts?_sort=likes';
    if (term) {
        uri += `&q=${term}`;
    }

    const res = await fetch(uri);
    const posts = await res.json();
    
    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.likes} likes</p>
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${post.id}">Read more...</a>
            </div>`
    })

    container.innerHTML = template;
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim());
})

// Wait and listen until DOM Content is loaded
window.addEventListener("DOMContentLoaded", () => renderPosts());