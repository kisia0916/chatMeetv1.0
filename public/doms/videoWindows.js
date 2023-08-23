function replaceArrayElements(array, targetId, sourceId) {

}
const videoWindow = (userList,userId)=>{
    userList.reverse()
    let html = userList.map((i,index)=>{
        if(i.userId == userId){
            if(index == 0){
                return`
                    <div class="videoWindowMain firstVideo">
                        <div class="videoWindowWarpp">
                            <video id = "myVideo" class="videoMainWindow" muted="muted" autoplay></video>
                        </div>
                        <div class="videoWindowNameWarpp">
                            <span class="videoWindowName">userName</span>
                        </div>
                    </div>
                `
            }else{
                return`
                    <div class="videoWindowMain">
                        <div class="videoWindowWarpp">
                            <video id = "myVideo"  class="videoMainWindow" muted="muted" width="600" height="500" autoplay></video>
                        </div>
                        <div class="videoWindowNameWarpp">
                            <span class="videoWindowName">userName</span>
                        </div>
                    </div>
                `
            }
        }else{
            if(index == 0){
                return`
                    <div class="videoWindowMain firstVideo">
                    <div class="videoWindowWarpp">
                        <video id = "video:${i.userId}" class="videoMainWindow" muted="muted" width="600" height="500" autoplay></video>
                    </div>
                    <div class="videoWindowNameWarpp">
                        <span class="videoWindowName">userName</span>
                    </div>
                    </div>
                `
            }else{
                return`
                    <div class="videoWindowMain">
                    <div class="videoWindowWarpp">
                        <video id = "video:${i.userId}" muted="muted" class="videoMainWindow" width="600" height="500" autoplay></video>
                    </div>
                    <div class="videoWindowNameWarpp">
                        <span class="videoWindowName">userName</span>
                    </div>
                    </div>
                `
            }
        }
    })
    return html
}
const videoWindow2 = (userId)=>{
    let html = `
        <div class="videoWindowMain firstVideo">
        <div class="videoWindowWarpp">
            <video id = "video:${userId}" class="videoMainWindow" muted="muted" width="600" height="500" autoplay></video>
        </div>
        <div class="videoWindowNameWarpp">
            <span class="videoWindowName">userName</span>
        </div>
        </div>
    `
    return html
}