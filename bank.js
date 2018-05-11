var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bankSchema = new Schema({
    term:{
        type:"string",
        required:true
    },
when:{
type:Object,
required:true
}

}, { capped: { size: 1024, max: 10, autoIndexId: true} })







var Bank = mongoose.model("Bank", bankSchema) 

module.exports = {Bank}