let userId = document.getElementById("userId").textContent
window.sessionStorage.setItem(["userId"],userId)
console.log(userId)
Socket.emit("createdSocketConnection",{userId:userId,page:"/main"})

const initPage = (roomList)=>{
    let listWarpp = document.querySelector(".publicRoomList")
    listWarpp.innerHTML = roomListDom(roomList)
}
