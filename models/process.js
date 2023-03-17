const processQueries = require("../db/queries").processQueryList;
const dbConneciton = require("../db/dbConnection");

class Process {
    constructor(id,packageName,date,xamlFile,repeat){
        this.id = id,
        this.packageName = packageName,
        this.date = date,
        this.xamlFile = xamlFile,
        this.repeat = repeat 

    }
static async createProcess (packageName,date,xamlFile,repeat){
    let queryText = processQueries.INSERT_PROCESS;
    let values = [packageName,date,xamlFile,repeat];
    try{
        const result = await dbConneciton.dbQuery(queryText,values);
        let process = new Process(result.id,result.packageName,result.date,result.xamlFile,result.repeat);
        return process;
    }
    catch(err){
        console.log("Model-Handling-Error: Failed to create a process entity\n", err);
        return null;
    }
}

}

module.exports = Process;