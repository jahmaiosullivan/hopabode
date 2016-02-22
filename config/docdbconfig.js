var config = {}
config.host = process.env.HOST || "https://onetomanydev.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "SI4M2aZ5eNAqoTojoQaxn1ZOyQunErq3ijdjFJJvgPWtXwdYB3aaBriJM7HTgbIIpBFAOR+przNU8C7Eh3fQQQ==";
config.databaseId = "ToDoList";
config.collectionId = "Items";
        
module.exports = config;