const roomListDom = (roomList)=>{
    let html = roomList.map((i)=>{
        return `
            <span>${i.roomName}</span>
            <span>${i.roomId}</span>
        `
    })
    return html
}