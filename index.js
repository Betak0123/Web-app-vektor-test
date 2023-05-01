
// Vi henter express bibloteket ned så vi kan bruge det i koden. 
const express = require('express')
const app = express()

// Det samme gøres for http biblioteket. Med det kan vi lave en http server.
const http = require('http')
const server = http.createServer(app)

// Derefter importeres Server-klassen fra biblioteket Socket.IO, og der oprettes en Socket.
const { Server } = require("socket.io")
const io = new Server(server)

// Vi sætter port til at have en værdi, og fortæller Express.js, at den offentlige mappe er public. Disse filer skal være mulige at tilgå i browseren. 
const port = 4000;
app.use(express.static('public'))

// Http-serveren bliver startet på den angivne prot
server.listen(port, () => {
  console.log('client available on: ' + port);
})

// håndterer Socket.IO's "connection" -begivenhed, som bliver udløst, når en klient opretter en forbindelse til serveren.
io.on('connection', (socket) => {
  console.log('a user connected')
  // der bliver udsendt "ip" -begivenheden til alle tilsluttede klienter med IP-adresse og portnummeret, som serveren lytter på.

  io.emit('ip', ip.address() + ":" + port)

})

//UDP TING
//dokumentation af dgram: https://nodejs.org/api/dgram.html

//npm install -s dgram
const udp = require('dgram')

//to get local ip
var ip = require('ip')

console.log(ip.address())
var udpSocket = udp.createSocket('udp4')


//Når den er klar til at få beskeder
udpSocket.on('listening', () => {
  var address = udpSocket.address()
  var port = address.port
  console.log('UDP Socket is listening at: ' + address.address + ":" + port);
})



udpSocket.on('message', (msg  ) =>{
    console.log(`${msg}`)
    var besked = `${msg}`
    io.emit('movement',`${besked}`)
}) 



//Hvis der sker en fejl
udpSocket.on('error', (err) => {
  console.log('socket error:\n' + err.stack);
  udpSocket.close()
});

// port, ip adresse, callback
udpSocket.bind(port,ip.address(),false);