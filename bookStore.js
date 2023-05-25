const helpers = require("./helpers");

exports.processBooksData = function(jsonFileName) {
  const booksData = helpers.parseData(jsonFileName);
  const processedBooksData = booksData.filter((book) => {
    if (!helpers.publishedDate(book)) return false;
    if (!helpers.filterAuthorsNames(book)) return false;
    return true;
  });
  const roundedPrices = helpers.roundPrices(processedBooksData);
  const sortedByTitle = helpers.sortByTitle(roundedPrices);
  helpers.writeFile(sortedByTitle);
}
