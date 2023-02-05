import cheerio from "cheerio";
import axios from "axios";

const re =
  /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g;

axios
  .get(
    "https://www.saveonfoods.com/sm/pickup/rsid/1982/categories/bakery-id-30846"
  )
  .then((res) => {
    const $ = cheerio.load(res.data);
    const results = $.html(
      "body div[data-testid] span:nth-child(1) span[class^='ProductCardPrice--ogjs72 eYfXkI']"
    );
    const results1 = $.html(
      "body div[data-testid] span:nth-child(1) div[class^='sc-hKFyIo bdDYJz']"
    );
    const results2 = $.html(
      "body div[data-testid] span:nth-child(1) span[class^='ProductCardPrice--ogjs72 jwvBiZ']"
    );
    const results3 = $.html(
      "body div[data-testid] span:nth-child(1) span[class^='WasPrice--1uafjgf ifkzXU']"
    );
    const results4 = $.html(
      "body div[data-testid] span:nth-child(1) span[class^='ProductCardPriceInfo--16z1xru dRWQHk']"
    );
    const results5 = $.html(
      "body div[data-testid] span:nth-child(1) img[class^='ProductCardImage--qpr2ve jFBFRS']"
    );

    let prices = results.split("\n");
    prices.forEach((e) => {
      let sanitized = e.replace(re, " ").split(" ");
      sanitized = sanitized.filter((entry) => entry.trim() != "");
      // console.log("------- prices", sanitized)
    });

    let names = results1.split("\n");
    names.forEach((e) => {
      let sanitized = e
        .replace(re, " ")
        .trim()
        .split(" Open product description   ");
      sanitized = sanitized.filter((entry) => entry != "");
      // console.log("------- names", sanitized)
    });

    let sale_price = results2.split("\n");
    sale_price.forEach((e) => {
      let sanitized = e.replace(re, " ").trim().split(" ");
      sanitized = sanitized.filter((entry) => entry.trim() != "");
      // console.log("-------- Sale Price", sanitized)
    });

    let was_price = results3.split("\n");
    was_price.forEach((e) => {
      let sanitized = e.replace(re, "").trim().split(" was ");
      sanitized = sanitized.filter((entry) => entry.trim() != "");
      // console.log("-------- was price", sanitized)
    });

    let weight = results4.split("\n");
    weight.forEach((e) => {
      let sanitized = e.replace(re, "").trim().split(" ");
      sanitized = sanitized.filter((entry) => entry.trim() != "");
      // console.log(sanitized)
    });

    $('img[class^="ProductCardImage--qpr2ve jFBFRS"]').each((i, e) => {
      const image = $(e).attr("src");
      // console.log(image)
    });
  });

const chicken_url =
  "https://www.saveonfoods.com/sm/pickup/rsid/1982/categories/meat-%26-seafood/chicken-%26-turkey-id-30798";
axios.get(chicken_url).then((res) => {
  const $ = cheerio.load(res.data);
  const results = $.html(
    "body div[data-testid] span:nth-child(1) span[class^='ProductCardPrice--ogjs72 eYfXkI']"
  );

  $("span[class^='ProductCardPrice--ogjs72 eYfXkI']").each((i, e) => {
    let price = $(e).text();
    // console.log(price)
  });

  $("div[class^='sc-hKFyIo bdDYJz']").each((i, e) => {
    let name = $(e).text();
    // console.log(name.split(" Open product description"))
  });

  const eggs_data_url =
    "https://cdn-gateflipp.flippback.com/bf/flipp/items/search?locale=en-ca&postal_code=V3M5t6&sid=&q=eggs";
  axios.get(eggs_data_url).then((res) => {
    const items_array = res.data.ecom_items;
    const new_item_array = [];

    function groceryItemObj() {
      for (let i = 0; i < items_array.length; i++) {
        let new_item_obj = {
          price: items_array[i].current_price,
          name: items_array[i].name,
          description: items_array[i].description,
          image: items_array[i].image_url,
        };
        new_item_array.push(new_item_obj);
      }
      return new_item_array;
    }
  });

  const milk_data_url =
    "https://cdn-gateflipp.flippback.com/bf/flipp/items/search?locale=en-ca&postal_code=V3M5t6&sid=&q=milk";
  axios.get(milk_data_url).then((res) => {
    const items_array = res.data.ecom_items;
    const new_item_array = [];

    function groceryItemObj() {
      for (let i = 0; i < items_array.length; i++) {
        let new_item_obj = {
          price: items_array[i].current_price,
          name: items_array[i].name,
          description: items_array[i].description,
          image: items_array[i].image_url,
        };
        new_item_array.push(new_item_obj);
      }
      return new_item_array;
    }
  });
});

const beef_data_url =
  "https://cdn-gateflipp.flippback.com/bf/flipp/items/search?locale=en-ca&postal_code=V3M5t6&sid=&q=beef";
axios.get(beef_data_url).then((res) => {
  const items_array = res.data.ecom_items;
  const new_item_array = [];

  function groceryItemObj() {
    for (let i = 0; i < items_array.length; i++) {
      let new_item_obj = {
        price: items_array[i].current_price,
        name: items_array[i].name,
        description: items_array[i].description,
        image: items_array[i].image_url,
      };
      new_item_array.push(new_item_obj);
    }
    return new_item_array;
  }
});
