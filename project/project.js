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

let projects = [];

/*class constructor for objects representing project articles*/
function Project(title, page, imgSrc, description) {
  this.title = title;
  this.page = page;
  this.imgSrc = imgSrc;
  this.description = description;
}

/*C-fold machine project object*/
const cFold = new Project(
  "C-FOLD MACHINE",
  "project.html",
  "../media/carousel-cover.gif",
  "Restoration of a fully automated folded hand towel machine for paper company."
);

/*function to save an article object to local memory*/
const pinArticle = (obj) => {
  let item = localStorage.getItem("paulBruwerHobbiesProjects");

  /*if local storage is empty create new item else overwrite existing item*/
  if (item === null) {
    projects[0] = obj;
    alert(`Article saved.\nYou have ${projects.length} articles saved.`);
    localStorage.setItem("paulBruwerHobbiesProjects", JSON.stringify(projects));
  } else {
    /*exist variable is to avoid clones of the same article object */
    let exists = false;
    projects = JSON.parse(localStorage.getItem("paulBruwerHobbiesProjects"));

    /*check here if obj already exists */
    projects.forEach((element) => {
      if (element.title === obj.title) {
        exists = true;
      }
    });

    /*if it doesn't exist, add to storage */
    if (exists === false) {
      projects.push(obj);
      alert(`Article saved.\nYou have ${projects.length} articles saved.`);
    } else {
      alert("This article has already been saved!");
    }

    localStorage.setItem("paulBruwerHobbiesProjects", JSON.stringify(projects));
  }
};

/*function to change to appearance of the like button when the users
selects "like" and to save this state to storage*/
const like = (id) => {
  /*get the like button specific to the article*/
  let itemName = `paulBruwerHobbies${id}`;
  let isLiked = JSON.parse(localStorage.getItem(itemName));
  let thisButton = document.getElementById(id);
  let buttonImage = thisButton.children[0];

  /*check whether the state of the like*/
  if (isLiked === null || isLiked === false) {
    isLiked = true;
    buttonImage.src = "../media/ThumbsUp-White.png";
    thisButton.style.backgroundColor = "#211649";
  } else if (isLiked === true) {
    isLiked = false;
    buttonImage.src = "../media/ThumbsUp-Blue.png";
    thisButton.style.backgroundColor = "White";
  }

  localStorage.setItem(itemName, JSON.stringify(isLiked));
};

/*this function checks what the state of the users likes are
for each article when the page is loaded*/
const isLiked = () => {
  let allLikes = document.getElementsByClassName("like");

  for (element of allLikes) {
    let id = element.id;
    let itemName = `paulBruwerHobbies${id}`;
    let isLiked = JSON.parse(localStorage.getItem(itemName));
    let thisButton = document.getElementById(id);
    let buttonImage = thisButton.children[0];

    if (isLiked === null || isLiked === false) {
      buttonImage.src = "../media/ThumbsUp-Blue.png";
      thisButton.style.backgroundColor = "White";
    } else if (isLiked === true) {
      buttonImage.src = "../media/ThumbsUp-White.png";
      thisButton.style.backgroundColor = "#211649";
    }
  }
};

document.getElementById("postButton").addEventListener("click",createComment);
document.getElementById("cancelButton").addEventListener("click",clearPost);