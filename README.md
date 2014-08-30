chatServer
==========

io.sockets.on('connection', function(socket){others})

.on()為socket的接收端，預設的key值是connection
.emit()為socket的發送端
.on()是處理瀏覽器送來的事件
.emit()是丟資料回瀏覽器


對於所有線上 socket 傳訊息
io.sockets.emit

對於所有線上 socket 收訊息
io.sockets.on

對於一個特定的 socket 傳訊息
socket.emit

對於一個特定的 socket 收訊息
socket.on

對於除了目前這個 socket 之外所有線上的 socket 傳訊息
向所有客户端广播
socket.broadcast.emit

對於除了目前這個 socket 之外所有線上的 socket 收訊息
socket.broadcast.on

{"name":"chat","args":["伺服器","Celia 已經連上囉"]}
{"name":"chat","args":["伺服器","Celia 進入聊天"]}
{"name":"chat","args":["伺服器","Celia 已經離開聊天"]}
{"name":"chat","args":["Celia","您好, 世界 !"]}
