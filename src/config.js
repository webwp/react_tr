const config={
    requestURL:'http://api.traffic.nnpark.cn',
    loginURL  :'#/login?redirect_url=',
    name:'出行南宁',
    defaultImg:'',
    handleImageErrored:(e) => {
        e.target.setAttribute('src','image/defaultImg.png')
    },

}

export default config;