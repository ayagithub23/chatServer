// Using with Node http server
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var url = require('url');

app.listen(8124);

function handler(request, response) {
    var url_parts= url.parse(request.url);
    if (request.url !== "/favicon.ico") {
        switch (url_parts.pathname) {
            case '/':
            case '/index':
                // console.log("目前執行所在的目錄：" + __dirname);
                // __dirname 目前正在執行指令碼所在的目錄名稱
                fs.readFile(__dirname + '/chat.html',
                    function(error, data) {
                        if (error) {
                            response.writeHead(404);
                            response.end('404 這是錯誤的頁面');
                        } else {
                            response.writeHead(200);
                        }
                        response.end(data);
                    }
                );
                break;
            case '/message':
                var queryData = url.parse(request.url, true).query;
                console.log(queryData);
                io.sockets.emit('chat', queryData);
                response.setHeader("Content-Type", "text/plain");
                response.write("send message.");
                response.write("name:" + queryData.name + " write:" + queryData.write);
                response.end();
        }
    }
    // 所有SOCKET接收連線訊息

    // 等待 connection 事件

    // 監聽接收 key 值為 connection 的 socket，並傳入變數 socke
    io.sockets.on('connection', function(socket) {
        console.log('2.收到client的連線');
        // 監聽接收 key 值為 "sendchat" 事件，然後 server 會傳入兩個變數 username , data
        socket.on('sendchat', function(data) {
            console.log('5.收到client的呼叫');
            console.log(data);
            // socket 等待 sendchat 事件後，
            // 然後傳送 chat 這個事件，把 username 和 data 這兩個訊息，廣播給線上所有的 client
            // 6. 送資料給client
            io.sockets.emit('chat', data);
        });
    });
}

    // io.sockets.on('connection', function(socket){others})

    //.on()為socket的接收端，預設的key值是connection
    //.emit()為socket的發送端
    //.on()是處理瀏覽器送來的事件
    //.emit()是丟資料回瀏覽器


    // 對於所有線上 socket 傳訊息
    // io.sockets.emit

    // 對於所有線上 socket 收訊息
    // io.sockets.on

    // 對於一個特定的 socket 傳訊息
    // socket.emit

    // 對於一個特定的 socket 收訊息
    // socket.on

    // 對於除了目前這個 socket 之外所有線上的 socket 傳訊息
    // 向所有客户端广播
    // socket.broadcast.emit

    // 對於除了目前這個 socket 之外所有線上的 socket 收訊息
    // socket.broadcast.on

    // {"name":"chat","args":["伺服器","Celia 已經連上囉"]}
    // {"name":"chat","args":["伺服器","Celia 進入聊天"]}
    // {"name":"chat","args":["伺服器","Celia 已經離開聊天"]}
    // {"name":"chat","args":["Celia","您好, 世界 !"]}


    //修改後
