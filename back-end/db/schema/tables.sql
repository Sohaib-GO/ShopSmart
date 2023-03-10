DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  lat NUMERIC(10,7) NOT NULL,
  lng NUMERIC(10,7) NOT NULL
);




DROP TABLE IF EXISTS stores CASCADE;
CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  lat NUMERIC(10,6) NOT NULL,
  lng NUMERIC(10,6) NOT NULL,
  image VARCHAR(555) NOT NULL
);

DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  category VARCHAR(255) NOT NULL,
  image VARCHAR(555) NOT NULL,
  store_id INTEGER REFERENCES stores(id) NOT NULL
);

DROP TABLE IF EXISTS grocery_lists CASCADE;
CREATE TABLE grocery_lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  item_id INTEGER REFERENCES items(id) NOT NULL,
  store_id INTEGER REFERENCES stores(id) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  date_added DATE NOT NULL
);


DROP TABLE IF EXISTS stores_items CASCADE;
CREATE TABLE stores_items (
  id SERIAL PRIMARY KEY,
  store_id INTEGER REFERENCES stores(id) NOT NULL,
  item_id INTEGER REFERENCES items(id) NOT NULL,
  date DATE NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  sale_price NUMERIC(10,2) NOT NULL,
  weight INTEGER NOT NULL
);