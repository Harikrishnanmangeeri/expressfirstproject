const express = require('express')
const app = express()
const port = 3000
const database=require('./userinfo')
const bodyparser = require('body-parser')
 app.use(bodyparser.json())

app.get('/', (req,res)=>{
    res.send(database)
})
app.post('/user',(req,res)=>{
    const {username,name,email}= req.body
    value = {username:username,name:name,email:email}
    database.push(value)
    res.json("added sucessfully")
})
app.put('/user/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    console.log(id)
    const userindex = database.findIndex((user)=> user.id ===id) 
    console.log(userindex)

if (userindex === -1){
    res.status(404).json({Error:"user not found"})
}
else{
    const {username,name,email}= req.body
    database[userindex]= {...database[userindex],name,email,username}
    res.json(database[userindex])
}
})
app.delete('/user/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const userindex = database.findIndex((user)=> user.id ===id) 
    if (userindex === -1){
        res.status(404).json({Error:"user not found"})
    }
    else{
      const userdlt = database.splice(userindex,1)[0]
      res.json(database)
        
    }

})


app.listen(port)