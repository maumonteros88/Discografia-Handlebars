const search = document.getElementById("search");
search.addEventListener("click", () => {
  const artist = document.getElementById("artist").value;
  const titles = document.getElementById("titles").value;
  const launch = document.getElementById("launch").value;
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
  window.location.href = `/buscar?${filter}`;
});
