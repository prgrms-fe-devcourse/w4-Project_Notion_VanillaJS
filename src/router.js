const ROUTE_CHANGE_EVENT_NAME='route-change'

export const initRouter = (onRoute)=>{
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e)=>{
        const {nextUrl} = e.detail

        if(nextUrl){
            history.pushState(null,null,nextUrl)
            onRoute()
        }
        //console .log(e.detail)
        //this.route()
    })


}

export const push = (nextUrl)=>{
    window.dispatchEvent(new CustomEvent('route-change',{
        detail:{
            nextUrl
        }
    }))

}