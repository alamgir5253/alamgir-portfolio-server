const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();
const port = process.env.PORT || 5000
const app = express()
// middle ware 
app.use(cors())
app.use(express.json())










const uri = "mongodb+srv://project:RiNp7C9jP2smmpeq@cluster0.j2qcl.mongodb.net/?retryWrites=true&w=majority";
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



  }finally{
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