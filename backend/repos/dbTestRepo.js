const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'dbTest1';

function dbRepo(){
    function loadData(data){
        return new Promise(async(resolve, reject) => {
            const client = new MongoClient(url);

            try {
                await client.connect();
                const db = client.db(dbName);

                results = await db.collection('newspapers').insertMany(data);
                resolve(results);
                
            } catch (error) {
                reject(error)
            }
            client.close();
        })
    }
}

module.exports = dbRepo();