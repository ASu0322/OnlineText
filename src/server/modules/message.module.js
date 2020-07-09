import mysql from 'mysql'
import config from '../../config/config'

const connectionPool = mysql.createPool({
    connection: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
})

const saveMessage = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {

            if (connectionError) {

                reject(connectionError)

            } else {
                var sqlCommand = "INSERT INTO Message(RoomID, FromUserID, Time, Message) VALUES('" +
                    insertValues.roomName + "','" +
                    insertValues.fromUserID + "','"+
                    "98-09-04" + "','"+
                    insertValues.message + "')"
                    connection.query(sqlCommand, function (err, result){

                    var resultPackage = {}

                    if (err) {
                        console.error('SQL error:', err)
                        resultPackage["success"] = "fail"
                        resolve(resultPackage);
                        // reject(error)
                    } else {
                        resultPackage["success"] = "success"
                        resultPackage["result"] = result
                        resolve(resultPackage);
                    }
                })

                connection.release()

            }
        })

    })
}

const getChatPreloadMessage = (insertValues) => {

    return new Promise((resolve, reject) => {

        connectionPool.getConnection((connectionError, connection) => {
            if (connectionError) {
                reject(connectionError)
            } else {
                var sqlCommand = "SELECT TOP" +
                    insertValues.limit +
                    " * From Message Where RoomID = " +
                    insertValues.roomID +
                    "DESC"

                connection.query(sqlCommand, function (err, result){

                    if (err) {
                        console.error('SQL error:', err)
                        resultPackage["success"] = "fail"
                        resolve(resultPackage);
                        // reject(error)
                    } else {
                        resultPackage["success"] = "success"
                        resultPackage["result"] = result
                        resolve(resultPackage);
                    }
                })
                connection.release()
            }
        })

    })
}

export default {
    saveMessage,
    getChatPreloadMessage
}