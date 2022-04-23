
const Ajv = require('ajv').default

const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "UserName": {
            "type": "string",
            "pattern": "^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$"
        },
        "password": {
            "type": "string",
            "pattern": "^[a-zA-Z0-9]{8,}$"
        }
    },
    "required": ["UserName", "password"]
}

module.exports=ajv.compile(schema)