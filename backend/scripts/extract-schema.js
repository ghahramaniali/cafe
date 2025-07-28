const fs = require('fs');

// Extract schema from setup.js
const setupContent = fs.readFileSync('scripts/setup.js', 'utf8');

// Extract CREATE TABLE statements
const createTableRegex = /CREATE TABLE IF NOT EXISTS (\w+) \(([\s\S]*?)\)/g;
const tables = [];
let match;

while ((match = createTableRegex.exec(setupContent)) !== null) {
  const tableName = match[1];
  const tableDefinition = match[2];
  
  tables.push({
    name: tableName,
    definition: `CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`
  });
}

// Generate schema file
let schemaSQL = `-- Cafe Database Schema
-- Generated from setup.js
-- Database: cafe_db

`;

// Add table creation statements
tables.forEach(table => {
  schemaSQL += `-- Table structure for table \`${table.name}\`
${table.definition};

`;
});

// Add sample data insertion
schemaSQL += `-- Sample Data Insertion
-- Categories
INSERT IGNORE INTO categories (id, name, description, image_url) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'قهوه', 'انواع قهوه‌های داغ و سرد', '/menu-items/coffee.png'),
('550e8400-e29b-41d4-a716-446655440002', 'اسپرسو', 'قهوه‌های اسپرسو و مشتقات آن', '/menu-items/espresso.png'),
('550e8400-e29b-41d4-a716-446655440003', 'کاپوچینو', 'کاپوچینو و لاته‌های مختلف', '/menu-items/cappuccino.png'),
('550e8400-e29b-41d4-a716-446655440004', 'نوشیدنی‌های سرد', 'نوشیدنی‌های خنک و آبمیوه‌ها', '/menu-items/ice-cappuccino.png'),
('550e8400-e29b-41d4-a716-446655440005', 'کیک و شیرینی', 'انواع کیک، شیرینی و دسر', '/menu-items/pastries.png');

-- Products
INSERT IGNORE INTO products (id, name, category_id, price, description, image_url, is_available, is_favorite) VALUES 
('660e8400-e29b-41d4-a716-446655440001', 'اسپرسو کلاسیک', '550e8400-e29b-41d4-a716-446655440002', 25000, 'اسپرسو خالص با طعم قوی و عالی', '/menu-items/espresso.png', true, true),
('660e8400-e29b-41d4-a716-446655440002', 'لاته وانیل', '550e8400-e29b-41d4-a716-446655440003', 35000, 'لاته با طعم وانیل طبیعی', '/menu-items/latte.png', true, true),
('660e8400-e29b-41d4-a716-446655440003', 'کاپوچینو', '550e8400-e29b-41d4-a716-446655440003', 30000, 'کاپوچینو کلاسیک با کف شیر', '/menu-items/cappuccino.png', true, false),
('660e8400-e29b-41d4-a716-446655440004', 'کولد برو', '550e8400-e29b-41d4-a716-446655440004', 40000, 'قهوه سرد با طعم ملایم', '/menu-items/coffee.png', true, true),
('660e8400-e29b-41d4-a716-446655440005', 'آب پرتقال', '550e8400-e29b-41d4-a716-446655440004', 25000, 'آب پرتقال تازه و طبیعی', '/menu-items/orange-juice.png', true, false),
('660e8400-e29b-41d4-a716-446655440006', 'کروسان شکلات', '550e8400-e29b-41d4-a716-446655440005', 20000, 'کروسان با شکلات تلخ', '/menu-items/pastries.png', true, false),
('660e8400-e29b-41d4-a716-446655440007', 'آمریکانو', '550e8400-e29b-41d4-a716-446655440001', 28000, 'قهوه آمریکانو با آب داغ', '/menu-items/coffee.png', true, false),
('660e8400-e29b-41d4-a716-446655440008', 'موکا', '550e8400-e29b-41d4-a716-446655440003', 38000, 'لاته با شکلات و کرم', '/menu-items/latte.png', true, false);

-- Admin User (password: admin123)
INSERT IGNORE INTO users (name, phone, password, is_admin) VALUES 
('مدیر سیستم', '09123456789', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', true);
`;

// Write to file
const filename = `cafe_schema_${new Date().toISOString().split('T')[0]}.sql`;
fs.writeFileSync(filename, schemaSQL);

console.log('✅ Schema extracted successfully!');
console.log(`📄 Schema file: ${filename}`);
console.log('\n📋 Database Tables:');
tables.forEach(table => {
  console.log(`   - ${table.name}`);
});

console.log('\n🔑 Default Admin Account:');
console.log('   Phone: 09123456789');
console.log('   Password: admin123'); 