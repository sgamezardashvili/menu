"use strict";
let express = require("express");
var path = require('path');
let menu_app = require('express')();
let http = require('http').Server(menu_app);
let io = require('socket.io')(http);
let clientListNames = [];

menu_app.use(express.static(__dirname, '/'));
menu_app.use(express.static(__dirname, '/server/'));
// menu_app.use(express.static(__dirname + "/..", '/client/'));
menu_app.use(express.static(__dirname + '/node_modules'));

menu_app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// menu_app.get('/menu', function(req, res){
// 	res.redirect('/');
// });

io.on('connection', function (socket) {
    console.log(socket.client);

    clientListNames.push(socket.handshake.query.userName);
    io.emit("updateSocketList", clientListNames);
    io.emit("addUserToSocketList", socket.handshake.query.userName);

    socket.on('disconnect', function () {
        let name = socket.handshake.query.userName;
        let userIndex = clientListNames.indexOf(socket.handshake.query.userName);
        if (userIndex != -1) {
            clientListNames.splice(userIndex, 1);
            io.emit("updateSocketList", clientListNames);
            io.emit("removeUserFromSocketList", name);
        }
    });

    socket.on('menuMessageToSocketServer', function (msg, func) {
        func("Message recieved!", socket.handshake.query.userName);
        let name = socket.handshake.query.userName;
        let sockectObj = { name, msg }
        io.emit('broadcastToAll_menuMessage', sockectObj);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});