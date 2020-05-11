var database = require('./database.js');

getTranslation = async (req, res) => {
    try {
        if(req.query.phrase){
            respone = await database.getTranslation(req.query.phrase);
            if (respone.length == 0){
                res.status(402);
                res.json({message: 'Phrase is not in the database'});
            } else {
                res.json(respone);
            }
        } else {
            res.status(400);
            res.json({message:'Request need a parameter of phrase'});
        }
    } catch (e) {
        console.log(e);
        res.status(500);
        res.json({message: 'Some internal errors occured'});
    } 
}

addTranslation = async (req, res) => {
    try {
        if(req.query.phrase){
            respone = await database.addTranslation(req.query.phrase, req.query.translation);
            res.send("Phrase is in the database now");
        } else {
            res.status(400);
            res.json({message:'Request need a parameter of phrase'});
        }
    } catch (e) {
        if (e.errno == 1062) {
            res.status(401);
            res.json({message:'This phrase is already in the database'});
        } else {
            console.log(e);
            res.status(500);
            res.json({message:'Some internal errors occured'});
        }
    } 
}

exports.getTranslation = getTranslation;
exports.addTranslation = addTranslation;