const pool = require('../db');

async function initializeAdvancedDB() {
    const conn = await pool.getConnection();
    try {
        // 1. 테이블 생성
        await conn.query(`CREATE TABLE IF NOT EXISTS customers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        region VARCHAR(100)
        )`);

        await conn.query(`CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100),
        category VARCHAR(100),
        price DECIMAL(10,2)
        )`);

        await conn.query(`CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY AUTO_INCREMENT,
        customer_id INT,
        order_date DATE,
        total_price DECIMAL(10,2),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
        )`);

        await conn.query(`CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY AUTO_INCREMENT,
        order_id INT,
        product_id INT,
        quantity INT,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`);

    // 2. 데이터 삽입
    const customerNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan'];
    const regions = ['Seoul', 'Busan', 'Daegu', 'Incheon', 'Gwangju'];

    for (let i = 0; i < customerNames.length; i++) {
        await conn.query('INSERT INTO customers (name, region) VALUES (?, ?)', [customerNames[i], regions[i]]);
        }

        const productCategories = ['Electronics', 'Books', 'Clothing', 'Home', 'Toys'];
        for (let i = 0; i < 20; i++) {
        await conn.query('INSERT INTO products (name, category, price) VALUES (?, ?, ?)', [
            `Product-${i+1}`,
            productCategories[i % productCategories.length],
            (Math.random() * 500).toFixed(2)
        ]);
    }

    for (let i = 0; i < 30; i++) {
        const customerId = Math.floor(Math.random() * customerNames.length) + 1;
        const orderDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        const totalPrice = (Math.random() * 1000).toFixed(2);
        const [orderResult] = await conn.query('INSERT INTO orders (customer_id, order_date, total_price) VALUES (?, ?, ?)', [customerId, orderDate, totalPrice]);
        const orderId = orderResult.insertId;

        const numItems = Math.floor(Math.random() * 5) + 1;
        for (let j = 0; j < numItems; j++) {
            const productId = Math.floor(Math.random() * 20) + 1;
            const quantity = Math.floor(Math.random() * 5) + 1;
            await conn.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, productId, quantity]);
        }
    }

    console.log('Advanced relational data successfully initialized!');
    } catch (error) {
        console.error('❌ DB Initialization Error:', error);
    } finally {
        conn.release();
    }
}

initializeAdvancedDB();