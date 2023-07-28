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
  "../project/project.html",
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
    thisButton.style.backgroundColor = "transparent";
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
      thisButton.style.backgroundColor = "transparent";
    } else if (isLiked === true) {
      buttonImage.src = "../media/ThumbsUp-White.png";
      thisButton.style.backgroundColor = "#211649";
    }
  }
};
