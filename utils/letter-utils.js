module.exports.sortLetters = (letters, sortType) => {
  switch (sortType) {
    case "price-desc":
      return letters.sort((a, b) => b.price - a.price);
    case "price-asc":
      return letters.sort((a, b) => a.price - b.price);
    case "author-desc":
      return letters.sort((a, b) => b.author.localeCompare(a.author));
    case "author-asc":
      return letters.sort((a, b) => a.author.localeCompare(b.author));
    default:
      return letters;
  }
};
