import  express from "express";
import cors from "cors"
import Tambola from "tambola-generator";
const tambola=Tambola.default
const app =express()
app.use(cors())
app.listen(5000,()=>{
    console.log("server started")
})




// for (let i = 0; i < sumFormat.length; i++) {
//     (function(i) {
//         setTimeout(function() {
//          res.status(200).json(sumFormat[i]);
//         }, 3000 * i);
//     })(i);
// }
app.get("/scramble",(req,res)=>{    
    const sumFormat =tambola.getDrawSequence() //Returns numbers 1-90 scrambled
     res.status(200).json(sumFormat)

})

app.get("/ticket",(req,res)=>{
    const x  = tambola.generateTickets(803) //This generates 100 tambola tickets
    res.status(200).json(x[0])
})
