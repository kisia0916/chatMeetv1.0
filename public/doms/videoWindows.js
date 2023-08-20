function replaceArrayElements(array, targetId, sourceId) {

}
const videoWindow = (userList,userId)=>{
    userList.reverse()
    let html = userList.map((i,index)=>{
        if(i.userId == userId){
            if(index == 0){
                return`
                    <video id = "myVideo" class="firstVideo" muted="muted" width="600" height="500" autoplay></video>
                `
            }else{
                return`
                    <video id = "myVideo" muted="muted" width="600" height="500" autoplay></video>
                `
            }
        }else{
            if(index == 0){
                return`
                    <video id = "video:${i.userId}" class="firstVideo" muted="muted" width="600" height="500" autoplay></video>
                `
            }else{
                return`
                    <video id = "video:${i.userId}" muted="muted" width="600" height="500" autoplay></video>
                `
            }
        }
    })
    return html
}
const videoWindow2 = (userId)=>{
    let html = `
        <video id = "video:${userId}" class="firstVideo" muted="muted" width="600" height="500" autoplay></video>
    `
    return html
}