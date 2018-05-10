var mongoose = require("mongoose");
var Bank = mongoose.model("Bank", {
    term:{
        type:"string",
        required:true
    },
when:{
type:Object,
required:true
}
})

module.exports = {Bank}