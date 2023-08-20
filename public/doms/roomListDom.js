const roomListDom = (roomList)=>{
    let html = roomList.map((i)=>{
        return `
            <span>${i.roomName}</span>
        `
    })
    return html
}