create TABLE catalog(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(35),
    key_name VARCHAR(35)
);

create TABLE subcatalog(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(50),
    name VARCHAR(50),
    catalog_id INT UNSIGNED,
    FOREIGN KEY (catalog_id) REFERENCES catalog (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

create TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(50),
    name VARCHAR(50),
    price DECIMAL,
    description TEXT,
    color VARCHAR(50),
    fabric VARCHAR(50),
    fabric_warehouse VARCHAR(50),
    material VARCHAR(50),
    size VARCHAR(50),
    date_created TIMESTAMP,
    catalog_id INT UNSIGNED,
	subcatalog_id INT UNSIGNED,
    FOREIGN KEY (catalog_id) REFERENCES catalog (id),
    FOREIGN KEY (subcatalog_id) REFERENCES subcatalog (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO catalog (name, key_name) values ('Взуття', 'boots');
INSERT INTO catalog (name, key_name) values ('Спецодяг', 'clothing');
INSERT INTO catalog (name, key_name) values ('Засоби індивідуального захисту', 'protected');
INSERT INTO catalog (name, key_name) values ('Господарчі товари', 'household');
INSERT INTO catalog (name, key_name) values ('Рукавиці', 'gloves');
INSERT INTO catalog (name, key_name) values ('Комп`ютерна вишивка', 'embroidery');