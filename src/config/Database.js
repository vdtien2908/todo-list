const mysql = require('mysql2/promise');

class Database {
    #HOST = 'localhost';
    #USERNAME = 'root';
    #DATABASE = 'todo';
    #PASSWORD = '';

    async handleConnect() {
        try {
            const pool = mysql.createPool({
                host: this.#HOST,
                user: this.#USERNAME,
                database: this.#DATABASE,
                password: this.#PASSWORD,
            });

            await pool.getConnection();
            console.log('Database connected successfully!');
            return pool;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Database;
