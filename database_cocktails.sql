create TABLE cocktail(
  id SERIAL PRIMARY KEY,
  name VARCHAR(51) NOT NULL,
  ingredients INT[]
);

create TABLE ingredient(
  id SERIAL PRIMARY KEY,
  name VARCHAR(51) NOT NULL,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES category (id)
);

create TABLE category(
  id SERIAL PRIMARY KEY,
  name VARCHAR(23) NOT NULL,
);

create TABLE amount(
  cocktail_id INTEGER,
  FOREIGN KEY (cocktail_id) REFERENCES cocktail (id),
  ingredient_id INTEGER,
  FOREIGN KEY (ingredient_id) REFERENCES ingredient (id),
  value INTEGER,
);