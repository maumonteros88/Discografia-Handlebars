const express = require("express");
const exphas = require("express-handlebars");
const path = require("path");
const app = express();
const discos = require("../back/discos.json");

const PORT = 3034;

app.engine(
  "handlebars",
  exphas({
    defaultLayout: "main-layout",
    layoutsDir: "views/layouts",
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("home", { titulo: "Welcome" });
});

app.get("/buscar", (req, res) => {
  let titles = req.query.titles;
  let artist = req.query.artist;
  let launch = req.query.launch;
  let result = discos.discos;

  if (artist) {
    result = result.filter((element) =>
      element.artista
        .toLocaleLowerCase()
        .includes(artist.toString().toLocaleLowerCase())
    );
  }

  if (titles) {
    result = result.filter((element) =>
      element.titulo
        .toLocaleLowerCase()
        .includes(titles.toString().toLocaleLowerCase())
    );
  }

  if (launch) {
    result = result.filter((element) => 
    element.lanzamiento.toString() === launch
    );
  }

  if (artist && launch) {
    result = result.filter((element) =>
        element.lanzamiento.toString() === launch &&
        element.artista
          .toLocaleLowerCase()
          .includes(artist.toString().toLocaleLowerCase())
    );
  }

  if (titles && launch) {
    result = result.filter(
      (element) =>
        element.lanzamiento.toString() === launch &&
        element.titulo
          .toLocaleLowerCase()
          .includes(titles.toString().toLocaleLowerCase())
    );
  }

  if (titles && launch && artist) {
    result = result.filter(
      (element) =>
        element.lanzamiento.toString() === launch &&
        element.titulo
          .toLocaleLowerCase()
          .includes(titles.toString().toLocaleLowerCase()) &&
        element.artista
          .toLocaleLowerCase()
          .includes(artist.toString().toLocaleLowerCase())
    );
  }

  res.render("cards", {
    discos: result,
  });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is up and listening on PORT:", PORT);
});
