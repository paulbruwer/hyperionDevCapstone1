// constructor for comment objects. Attributes are a date of post and the comment body
function Comment(date, body){
    this.date = date;
    this.body = body;
}

// post button calls this function to:
    // create a date object for the date of post
    // create a object for the comment using the constructor above
    // pull objects form local storage into the object array
    // if no data is found in local storage
        // set comment object as first entry in object array
        // set object array to local storage
    // if local storage contains data
        // append object array
        // set object array to local storage
const createComment = () => {
    // object array for all the comments on the page
    let comments = []
    const date = new Date();
    let commentText = document.getElementById("textAreaExample").value;
    const comment = new Comment(
        `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        commentText
    );

    let commentStorage = JSON.parse(localStorage.getItem("cFoldComments"));

    if (commentStorage === null) {
        comments[0] = comment;
        localStorage.setItem("cFoldComments",JSON.stringify(comments));
    }else{
        comments = JSON.parse(localStorage.getItem("cFoldComments"));
        comments.push(comment);
        localStorage.setItem("cFoldComments",JSON.stringify(comments));
    }

    loadComments();

    document.getElementById("textAreaExample").value = "";
};

// function to clear comment section
// pull data from local storage
// loop through each element of the object array to:
    // write element to comment section
const loadComments = () =>{
    let commentSection = document.getElementById("commentSection");
    commentSection.innerHTML = " ";
    let comments = JSON.parse(localStorage.getItem("cFoldComments"));
    if (comments != null){
        comments.forEach(element => {
            let headContainer = commentSection.appendChild(document.createElement("div"));
            headContainer.className = "d-flex flex-start align-items-center";
            let head = headContainer.appendChild(document.createElement("div"));
            let posterName = head.appendChild(document.createElement("h6"));
            posterName.className = "fw-bold text-primary mb-1";
            posterName.textContent = "Anonymous";
            let postDate = head.appendChild(document.createElement("p"));
            postDate.className = "text-muted small mb-0";
            postDate.textContent = `shared - ${element.date}`;
            let commentBody = commentSection.appendChild(document.createElement("p"));
            commentBody.className = "mt-3 mb-4 pb-2";
            commentBody.textContent = element.body;
        });
    }
}

// clear input element
const clearPost = () => {
    document.getElementById("textAreaExample").value = "";
}

document.getElementById("postButton").addEventListener("click",createComment);
document.getElementById("cancelButton").addEventListener("click",clearPost);