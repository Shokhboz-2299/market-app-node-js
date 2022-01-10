const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if(req.method == 'GET') {
  if(req.url.split("/")[1]=="markets") {
    fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
      if(err) throw err
      console.log(JSON.parse(data)[req.url.split("/")[2]-1]);
      res.end(data)
    })
  }
  
  if(req.url.split("/")[1]==="markets" && req.url.split("/")[2]) {
    fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
      if(err) throw err
      const temp =  JSON.parse(data).filter(e => e.id == req.url.split("/")[2]) 
      console.log(temp);
      res.end(JSON.stringify(temp, null, 4))
    })
  }

  if(req.url.split("/")[1]==="marketInfo" && req.url.split("/")[2] && !(req.url.split("/")[3])) {
    fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
      if(err) throw err
      const temp =  JSON.parse(data).filter(e => e.id == req.url.split("/")[2]) 
      fs.readFile(path.resolve(__dirname, "./data/marketBranches.json"), (err, data) => {
        if(err) throw err
        const addBranch = JSON.parse(data).filter(e => e.marketId == req.url.split("/")[2])
        temp[0].branches=addBranch;
        fs.readFile(path.resolve(__dirname, "./data/marketProducts.json"), (err, data) => {
          if(err) throw err 
          const addProducts = JSON.parse(data).filter(e => e.marketId == req.url.split("/")[2])
          temp[0].products = addProducts;
          fs.readFile(path.resolve(__dirname, "./data/marketWorkers.json"), (err, data) => {
            if(err) throw err 
            const addWorkers = JSON.parse(data).filter(e => e.marketId == req.url.split("/")[2])
            temp[0].workers = addWorkers;
            res.end(JSON.stringify(temp, null, 4))
          })
        })
      })
    }) 
  }

  // =========================

  if(req.url.split("/")[1]==="marketInfo" && req.url.split("/")[2] && req.url.split("/")[3]==="products") {
      fs.readFile(path.resolve(__dirname, "./data/marketProducts.json"), (err, data) => {
        if(err) throw err
        const products = JSON.parse(data).filter(a => a.marketId == req.url.split("/")[2])
        res.end(JSON.stringify(products, null, 4))
      })
  }
  // ================

  if(req.url.split("/")[1]==="marketInfo" && req.url.split("/")[2] && req.url.split("/")[3]==="workers") {
    fs.readFile(path.resolve(__dirname, "./data/marketWorkers.json"), (err, data) => {
      if(err) throw err
      const products = JSON.parse(data).filter(a => a.marketId == req.url.split("/")[2])
      res.end(JSON.stringify(products, null, 4))
    })
}

  // ==============

  }

  // POST method 

   if(req.method=='POST') {
     if (req.url.substring(1)=='newMarket'){
       req.on("data", data => {
         const newmarket = JSON.parse(data);
       
         fs.readFile(path.resolve(__dirname, "./data/markets.json"), (err, data) => {
           if(err) throw err;
           const arr = JSON.parse(data)
           newmarket.id = arr.length + 1;
           arr.push(newmarket)

           fs.writeFile(path.resolve(__dirname, "./data/markets.json"), JSON.stringify(arr, null,4), (err) => {
             if(err) throw err 
             console.log("Added");
           })
         })
       })
       res.end('Ok');
     }

     if (req.url.substring(1)=='newBranch'){
      req.on("data", data => {
        const newmarket = JSON.parse(data);
      
        fs.readFile(path.resolve(__dirname, "./data/marketBranches.json"), (err, data) => {
          if(err) throw err;
          const arr = JSON.parse(data)
          newmarket.id = arr.length + 1;
          arr.push(newmarket)

          fs.writeFile(path.resolve(__dirname, "./data/marketBranches.json"), JSON.stringify(arr, null,4), (err) => {
            if(err) throw err 
            console.log("Added");
          })
        })
      })
      res.end('Ok');
    }

// ===============================

    if (req.url.substring(1)=='newWorker'){
      req.on("data", data => {
        const newmarket = JSON.parse(data);
      
        fs.readFile(path.resolve(__dirname, "./data/marketWorkers.json"), (err, data) => {
          if(err) throw err;
          const arr = JSON.parse(data)
          newmarket.id = arr.length + 1;
          arr.push(newmarket)

          fs.writeFile(path.resolve(__dirname, "./data/marketWorkers.json"), JSON.stringify(arr, null,4), (err) => {
            if(err) throw err 
            console.log("Added");
          })
        })
      })
      res.end('Ok');
    }

    // ========================

    if (req.url.substring(1)=='newProduct'){
      req.on("data", data => {
        const newmarket = JSON.parse(data);
      
        fs.readFile(path.resolve(__dirname, "./data/marketProducts.json"), (err, data) => {
          if(err) throw err;
          const arr = JSON.parse(data)
          newmarket.id = arr.length + 1;
          arr.push(newmarket)

          fs.writeFile(path.resolve(__dirname, "./data/marketProducts.json"), JSON.stringify(arr, null,4), (err) => {
            if(err) throw err 
            console.log("Added");
          })
        })
      })
      res.end('Ok');
    }

   }

})

server.listen(9000, () => {
  console.log('server is running at localhost 9000')
}
 )
