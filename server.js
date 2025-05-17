const express = require('express');
const cors = require('cors');

const app = express();

const policies = require('./data/policies.json');

app.use(cors());


app.get('/api/policies', (req, res) => {
    let filtered = [...policies];

    const { name , type , minpremium , maxpremium , mincoverage , sort } = req.query;

    if(name){
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    if(type){
       filtered = filtered.filter(
        p => p.type.toLowerCase() === type.toLowerCase()
       )
    }

    if(minpremium){
      filtered = filtered.filter(
        p => p.premium >= parseInt(minpremium)
      )
    }

    if(maxpremium){
      filtered = filtered.filter(
        p => p.premium <= parseInt(maxpremium)
      )
    }

    if(mincoverage){
      filtered = filtered.filter(
        p => p.coverage >= parseInt(mincoverage)
      )

    }

    if(sort === 'asc'){
      filtered.sort((a,b) => a.premium - b.premium)
    } else if(sort === 'desc'){
     filtered.sort((a,b) => b.premium - a.premium)
    }

    res.json(filtered);
    // res.send("working")
})



app.listen(3000, () => console.log("http://localhost:3000"));




