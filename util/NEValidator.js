
const Ajv = require('ajv').default

const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "UserName": {
            "type": "string",
            "pattern": "^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$"
        },
        "group": { enum: ['Normal Employee']}
    },
    "required": ["UserName", "group"]
}

module.exports=ajv.compile(schema)