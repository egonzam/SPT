const constants = require('./constants')
const json2csv = require("json2csv").Parser;
const fs = require("fs");

const parseData = (fileName) => {
    // work with different file extensions
    try {
      const rawBooksData = fs.readFileSync(`./${fileName}.json`);
      return JSON.parse(rawBooksData);
    } catch (error) {
      throw error;
    }
  };
  
  const publishedDate = (book) => {
    if (book.publish_date !== null) {
      const verifiedDate = new Date(book.publish_date);
      if (verifiedDate.getDay() === 0) {
        return false;
      }
      return true;
    }
  };
  const filterAuthorsNames = ({ author } = {}) => {
    return !(
      !author ||
      constants.authorsBlockedNames.some((blockedName) =>
        author.toLowerCase().includes(blockedName)
      )
    );
  };

  const roundPrices = (booksData) => {
    return booksData.map((book) => {
      if (book.price !== null) {
        book.price = book.price ? Math.ceil(book.price) : 0;
      }
      return book;
    });
  };

  const sortByTitle = (booksData) => {
    return booksData.sort((a, b) => {
      if (a.title !== null && b.title !== null) {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) {
          return -1;
        } else if (titleA > titleB) {
          return 1;
        } else {
          return 0;
        }
      }
      return 0; 
    });
  };
  
  

const writeFile = (processedBooksData) => {
    const fields = ["title", "author", "price"];
    const json2csvParser = new json2csv({ fields });
    const csvData = json2csvParser.parse(processedBooksData);
    fs.writeFileSync("./processed_books.csv", csvData);
    console.log("Processing is complete");
}


  exports.parseData = parseData
  exports.publishedDate = publishedDate
  exports.filterAuthorsNames = filterAuthorsNames
  exports.roundPrices = roundPrices
  exports.writeFile = writeFile
  exports.sortByTitle = sortByTitle