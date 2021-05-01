const en_US = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
}

const da_DK = {
  28: "Action",
  12: "Eventyr",
  16: "Animation",
  35: "Komedie",
  80: "Kriminalitet",
  99: "Documentary",
  18: "Drama",
  10751: "Familie",
  14: "Fantasy",
  36: "Historie ",
  27: "Gyser",
  10402: "Musik",
  9648: "Mysterium",
  10749: "Romantik",
  878: "Sci-fi",
  10770: "TV film",
  53: "Thriller",
  10752: "Krig",
  37: "Western",
}

export function getGenre(language: "da" | "en", genreId: string) {
  const genreList_en_US = new RegExp(Object.keys(en_US).join("|"), "gi")
  const genreList_da_DK = new RegExp(Object.keys(da_DK).join("|"), "gi")
  let genre = null

  if (language === "da") {
    genre = genreId.replace(genreList_da_DK, function (matched: string) {
      return da_DK[matched]
    })
  }
  if (language === "en") {
    genre = genreId.replace(genreList_en_US, function (matched: string) {
      return en_US[matched]
    })
  }
  return genre
}
