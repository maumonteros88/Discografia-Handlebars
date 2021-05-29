let cards = document.getElementById("cards");
const search = document.getElementById("search");
const loading = document.getElementById("loading")

const xhr = new XMLHttpRequest();

search.addEventListener("click", () => {
  loading.style.display="block"
  // @ts-ignore
  const artist = document.getElementById("artist").value;
  // @ts-ignore
  const titles = document.getElementById("titles").value;
  // @ts-ignore
  const launch = document.getElementById("launch").value;

  xhr.addEventListener("load", () => {
    cards.innerHTML = "";
    const response = JSON.parse(xhr.responseText);

    response.forEach((element) => {
      cards.innerHTML += 
       `<div class="card col-4" style="width: 18rem; margin-left:10px; margin-top: 10px">
        <img src="${element.tapa}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${element.artista}</h5>
        <h6 class="card-title">${element.titulo}</h6>
        <p class="card-text">Lanzamiento: ${element.lanzamiento}</p>        
        </div>
        </div>`;
    });
  });

  let filter = "";

  if (artist) {
    filter += (filter ? "&" : "") + `artist=${artist}`;
  }
  if (titles) {
    filter += (filter ? "&" : "") + `titles=${titles}`;
  }
  if (launch) {
    filter += (filter ? "&" : "") + `launch=${launch}`;
  }
  xhr.open("GET", `/discos?${filter}`);
  xhr.send();
});
