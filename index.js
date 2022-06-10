const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const port = process.env.PORT || 5000
const app = express()
// middle ware 
app.use(cors())
app.use(express.json())










const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j2qcl.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//  
//   console.log('ssssssss');
// });

async function run(){
  try{
    client.connect()
    const projectCollection = client.db('portfolio').collection('project')
console.log('all okf');

    app.get('/projects', async(req,res) =>{
      const query ={}
      const result = await projectCollection.find(query).toArray()
      res.send(result)
    })

    app.get('/project/:id', async(req, res) =>{
      const id = req.params.id
      const query = {_id: ObjectId(id)}
      const part = await projectCollection.findOne(query)
      res.send(part)
    })



  }
  finally{
 // client.close();
  }



}
run().catch(console.dir)











app.get('/', (req, res) => {
  res.send(' process success')
})
app.listen(port, () => {
  console.log('listening to port', port);
})