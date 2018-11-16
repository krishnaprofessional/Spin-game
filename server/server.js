const  http = require('http');

http.createServer(function (req, res) {
    let num = []; // 1,5,3, true
    let bonus = false;
    for(let i = 0; i < 3; i++) {
        let digit = Math.round(Math.random()*10) % 6;
        bonus = digit % 3 === 0;  /// 1% 3 = false, 5%3 == false ,3%3 == true
        num.push(digit);// 1, 5 ,3
    }
    num.push(bonus);// true // false 
    res.writeHead(200, {'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    });
   
   res.end(JSON.stringify(num));

   
}).listen(8080);