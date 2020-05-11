var mysql = require('mysql');
const util = require('util');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vincy520',
    database: 'sys',
    port: 3306
  });
const query = util.promisify(connection.query).bind(connection)
getTranslation = async function (phrase) {
    phrase.trim();
    string = `SELECT chinese from dictionary WHERE english = '${phrase.toLowerCase()}'`;   
    try{
        data = await query(string);
        return data;
    } catch (e) {
        throw e;
    }
    
    
}
addTranslation = async function (phrase, translation) {
    phrase.trim();
    if (translation){
        string = `INSERT INTO dictionary(english, chinese) VALUES('${phrase.toLowerCase()}', '${translation}')`;   
    } else {
        string = `INSERT INTO dictionary(english) VALUES('${phrase.toLowerCase()}')`;
    }
    try{
        data = await query(string);
        return data;
    } catch (err) {
        throw err;
    }
}

updateTranslation = async function (phrase, translation) {
    phrase.trim();
    string = `UPDATE dictionary SET chinese = '${translation}' WHERE english = '${phrase.toLowerCase()}'`;
    try{
        data = await query(string);
        return data;
    } catch (err) {
        throw err;
    }
}
exports.getTranslation = getTranslation;
exports.addTranslation = addTranslation;
exports.updateTranslation = updateTranslation;