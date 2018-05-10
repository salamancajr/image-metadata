var mongoose = require("mongoose");
var Bank = mongoose.model("Bank", {
    term:{
        type:"string",
        required:true
    },
when:{
type:"string",
required:true
}
})

module.exports = {Bank}