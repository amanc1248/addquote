const express = require("express");
const app = express();
const router = express.Router();
const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));
app.use("/api/quotes", router);
router.get("/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.send({ quote });
});
router.get("/", (req, res, next) => {
  const personQuery = req.query.person;
  if (!personQuery) {
    console.log(quotes);
    res.send({ quotes: quotes });
  } else {
    let array = quotes.filter((quote) => quote.person === personQuery);
    if (array.length > 0) {
      res.send({ quotes: array });
    } else {
      res.send({ quotes: [] });
    }
  }
});
router.post("/", (req, res, next) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (quote && person) {
    const quoteObj = { quote: quote, person: person };
    console.log(quoteObj);
    quotes.push(quoteObj);
    res.send({ quote: quoteObj });
  } else {
    console.log("error");
    res.status(400).send();
  }
});
app.listen(PORT, () => {
  console.log("server is runnnig");
});
