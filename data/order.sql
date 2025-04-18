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
  group_uuid VARCHAR(50) UNIQUE,
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
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
  -- FOREIGN KEY (template) REFERENCES menu_templates(name) ON DELETE CASCADE
);
INSERT INTO `ordergroups` (`id`, `group_uuid`, `owner_id`, `title`, `restaurant`, `menu_link`, `max_people`, `deadline`, `password`, `description`, `status`, `template`, `is_active`, `created_at`) VALUES
(1, 'TzERYXy9M4', 1, '訂飲料拉!', '大苑子', '', 100, '2025-04-17 15:33:00', '12345', '轉錢帳號：23-44', 'closed', 'drink', 1, '2025-04-17 06:35:59'),
(2, 'fPvyhs27ac', 1, '請客了!', '麻古', '', 100, '2025-04-17 17:23:00', '', '', 'closed', 'drink', 1, '2025-04-17 09:21:08');
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_uuid VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  quantity INT DEFAULT 1,
  price DECIMAL(10, 2),
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Paid', 'Non-payment') DEFAULT 'Non-payment',
  FOREIGN KEY (group_uuid) REFERENCES orderGroups(group_uuid) ON DELETE CASCADE
);

INSERT INTO orders (group_uuid, name,item_name ,quantity,price,note)
VALUES ('TzERYXy9M4', '小明', '波霸奶茶', '1','50','半糖少冰');

SELECT menu_templates.fields FROM  orderGroups LEFT JOIN menu_templates ON orderGroups.template = menu_templates.name WHERE group_uuid = 'TzERYXy9M4';

CREATE TABLE menu_templates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,              
  fields JSON NOT NULL,                   
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  -- FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO menu_templates (name, fields)
VALUES (
  'drink',
  '[
    { "label": "訂購人,name", "type": "text", "required": true },
    { "label": "今天要點什麼,item_name", "type": "text", "required": true },
    {
      "label": "甜度",
      "type": "radio",
      "options": ["無糖", "微糖", "半糖", "少糖", "全糖", "固定"],
      "required": true
    },
    {
      "label": "冰塊",
      "type": "radio",
      "options": ["去冰", "微冰", "少冰", "正常冰", "固定", "熱飲"],
      "required": true
    },
    { "label": "備註", "type": "textarea" }
  ]'
);

