CREATE DATABASE how_order;
USE how_order;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  account VARCHAR(255)  UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (email, account, password_hash, name)
VALUES ('jing@example.com', 'jing3320', '$2b$10$zj4EyfqWJrr61Cs/Wbn1AOr0norL.XEA8uMc9aKLlFPKUE0Q8i/MW', '小禎');

CREATE TABLE orderGroups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  restaurant VARCHAR(100) NOT NULL,
  menu_link VARCHAR(255),
  max_people INT,
  deadline DATETIME NOT NULL,
  password VARCHAR(100),
  description TEXT,
  status ENUM('open', 'full', 'closed') DEFAULT 'open',
  template VARCHAR(100), -- 模板 之後新增default
  is_active BOOLEAN DEFAULT TRUE, -- 刪除揪團
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  -- FOREIGN KEY (template) REFERENCES menu_templates(name) ON DELETE CASCADE
);
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  quantity INT DEFAULT 1,
  price DECIMAL(10, 2),
  total INT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES orderGroups(id) ON DELETE CASCADE
);

CREATE TABLE menu_templates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,              -- 模板名稱
  fields JSON NOT NULL,                    -- 欄位配置（表單定義）
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);
