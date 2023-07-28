let projects = [];

projects = JSON.parse(localStorage.getItem("paulBruwerHobbiesProjects"));

/*function reads all the articles saved to local storage as saved by index.js 
as selected by the user and populates the page with elements to represent
each article*/
if (projects != null) {
  projects.forEach((element) => {
    let body = document.querySelector("body");
    let row = body.appendChild(document.createElement("div"));
    row.className = "row";
    let articleCol = row.appendChild(document.createElement("div"));
    articleCol.className = "col-md-12 article-col";
    let postItNote = articleCol.appendChild(document.createElement("div"));
    postItNote.className = "post-it-note";
    let link = postItNote.appendChild(document.createElement("a"));
    link.href = element.page;
    let article = link.appendChild(document.createElement("div"));
    article.className = "article";
    article.style.backgroundImage = `url(${element.imgSrc})`;
    let title = article.appendChild(document.createElement("h5"));
    title.textContent = element.title;
  });
} else {
  alert("You have no pinned articles!");
}
