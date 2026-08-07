document.getElementById("fetchBtn").addEventListener("click", function() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(function(response) {
            if (!response.ok) {
                throw new Error("network response was not ok");
            }
            return response.json();
        })
        .then(function(data) {
            document.getElementById("output").innerHTML =
                "<strong>Title:</strong> " + data.title + "<br><strong>Body:</strong> " + data.body;
        })
        .catch(function(error) {
            document.getElementById("output").innerHTML =
                "<span class='error-msg'>something went wrong: " + error.message + "</span>";
        });
});
document.getElementById("xhrBtn").addEventListener("click", function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                document.getElementById("output").innerHTML =
                    "<strong>Title:</strong> " + data.title + "<br><strong>Body:</strong> " + data.body;
            } else {
                document.getElementById("output").innerHTML =
                    "<span class='error-msg'>error loading data, status: " + xhr.status + "</span>";
            }
        }
    };
    xhr.send();
});
document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("postTitle").value;
    const body = document.getElementById("postBody").value;
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            body: body
        })
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("network response was not ok");
            }
            return response.json();
        })
        .then(function(data) {
            document.getElementById("postOutput").innerHTML =
                "post created, new id: " + data.id + ", title: " + data.title;
        })
        .catch(function(error) {
            document.getElementById("postOutput").innerHTML =
                "<span class='error-msg'>could not create post: " + error.message + "</span>";
        });
});
document.getElementById("putForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("updateId").value;
    const title = document.getElementById("updateTitle").value;
    const body = document.getElementById("updateBody").value;
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", "https://jsonplaceholder.typicode.com/posts/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                document.getElementById("putOutput").innerHTML =
                    "post updated, title: " + data.title + ", body: " + data.body;
            } else {
                document.getElementById("putOutput").innerHTML =
                    "<span class='error-msg'>error updating post, status: " + xhr.status + "</span>";
            }
        }
    };
    xhr.send(JSON.stringify({
        title: title,
        body: body
    }));
});
