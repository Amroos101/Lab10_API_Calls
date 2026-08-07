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
