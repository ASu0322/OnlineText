import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const createAccount = (insertValues) => {
    return new Promise((resolve, reject) => {
        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                connection.query('insert INTO Account SET ?', {
                    user_account: insertValues.user_account,
                    user_password: insertValues.user_password,
                }, (error, result) => {
                    if (error) {

                        console.error('SQL error:', error)
                        reject(error)

                    } else {

                        resolve(`success register`)

                    }
                })
                connection.release()
            }
        })
    })
}

export default {
    createAccount
}