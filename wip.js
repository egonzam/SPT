const helpers = require('./helpers')
const fs = require("fs");
const json2csv = require("json2csv").Parser;

function processBooksData(jsonFileName) {
  const booksData = helpers.parseData(jsonFileName);
  const processedBooksData = booksData
    .filter((book) => {
      if (!helpers.publishedDate(book)) return false;
      if (!helpers.filterAuthorsNames(book)) return false;
      return true;
    })
    .map((book) => {
      book.price = book.price ? Math.ceil(book.price) : 0;
      return book;
    })
    .sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      } else if (titleA > titleB) {
        return 1;
      } else {
        return 0;
      }
    });

  const fields = ["title", "author", "price"];
  const json2csvParser = new json2csv({ fields });
  const csvData = json2csvParser.parse(processedBooksData);

  fs.writeFileSync("./processed_books.csv", csvData);

  console.log("Processing is complete");
}
processBooksData("books");
