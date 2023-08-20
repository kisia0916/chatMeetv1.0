let userId = document.getElementById("userId").textContent
console.log(userId)
if(!userId){
    console.log(userId)
    location.href = "/catchpage"
}else{
    Socket.emit("createdSocketConnection",{userId:userId,page:"/main"})
}
if(!window.sessionStorage.getItem(["userId"])){
    window.sessionStorage.setItem(["userId"],userId)
}
const createRoom = ()=>{
    let roomName = document.getElementById("createRoomName").value
    let roomPass = document.getElementById("createRoomPass").value
    Socket.emit("createRoom",{host:userId,roomName:roomName,pass:roomPass})
}

