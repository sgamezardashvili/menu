var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

var dictioany = [];

io.on('connection', function (socket) {
    console.log('connected');

    // clientListNames.push(socket.handshake.query.userName);
    // setInterval(function () {
    //     io.emit("updateFood", 'food');
    // }, 1000);

    // io.emit("addUserToSocketList", socket.handshake.query.userName);

    socket.on('disconnect', function () {

        dictioany.forEach(function (item) {

            var disconnectedUserKey = item.items.find(function (key) {
                return key == socket.id;
            })
            console.log(item.items);

            if (disconnectedUserKey != undefined) {
                item.items.splice(item.items.indexOf(socket.id), 1);
                console.log(item.items);
            }
        });

        console.log('disconnected');
    });

    socket.on('menuMessageToSocketServer', function (msg, func) {
        func("Message recieved!", socket.handshake.query.userName);
        let name = socket.handshake.query.userName;
        let sockectObj = { name, msg }
        io.emit('broadcastToAll_menuMessage', sockectObj);
    });

    socket.on('addUser', function (tableId, userKey) {       

        var room = dictioany.find(function (item) {
            return item.key == tableId;
        });

        if (room != undefined) {
            room.items.push(userKey)
        }
        else {
            dictioany.push({ key: tableId, items: [userKey] });
        }

        socket.join(tableId);
    });

    socket.on('selectFood', function (food, tableId) {
        console.log('selectFood method call TableId is ' + tableId);

        var room = dictioany.find(function (item) {
            return item.key == tableId;
        });

        if (room != undefined) {
            var keys = [];

            room.items.forEach(function (key) {
                if (key != socket.id) {
                    keys.push(key);
                }
            });

            console.log(food);

            io.to(tableId).emit('onSelectFood', food, keys);
        }

        //io.emit('onSelectFood', food, users);
    });

        socket.on('unSelectFood', function (food, tableId) {
        console.log('unSelectFood method call TableId is ' + tableId);

        var room = dictioany.find(function (item) {
            return item.key == tableId;
        });

        if (room != undefined) {
            var keys = [];

            room.items.forEach(function (key) {
                if (key != socket.id) {
                    keys.push(key);
                }
            });

            console.log(food);

            io.to(tableId).emit('onUnSelectFood', food, keys);
        }

        //io.emit('onSelectFood', food, users);
    });
});

server.listen(3000, function () {
    console.log('Server listen port 3000!');
});  