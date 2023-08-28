const roomListDom = (roomList)=>{
    console.log(roomList)
    let html = roomList.map((i)=>{
        return `
        <div class="topSpace"></div>
        <a href="/join/${i.roomId}">
            <div class="roomCard">
                <div class="roomCardLeft">
                    <img src="${i.icon}" class="roomIcon" />
                </div>
                <div class="roomCardRight">
                    <div class="roomCardText">
                        <span class="roomTitle">${i.roomName}</span>
                    </div>
                    <div class="roomCardInfos">
                        <span class="material-symbols-outlined roomPersonIcon">
                            person
                        </span>
                        <span class="roomCardNum">12</span>
                        <button class="RoomListlinkCopyButton"><span class="material-symbols-outlined">
                            link
                        </span></button>
                    </div>
                </div>
            </div>
        </a>
        `
    }).join("")
    if(roomList.length == 0){
        html = `
        <div class="topSpace"></div>
            <div class="noRoomDom">
            <span class="noRoomText">No Room</span>
            </div>
        `
    }
    return html
}