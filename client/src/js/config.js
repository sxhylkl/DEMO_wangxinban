let APIHOST = 'http://localhost:3000';

if(sessionStorage.islogin == undefined || sessionStorage.islogin != 'true') {
    location.href = '/index.html';
} else {
    // document.querySelector('section').removeAttribute('class');
}

// initiate navbar
let page = {
    home:   '综合信息平台',
    list:   '监控统计信息',
    task:   '常规设置',
    custom: '特殊任务定制'
};
let navbartmp = '';
for(let i in page) {
    navbartmp += `<a href="/${i}.html" ${location.pathname.indexOf(i+'.html')>0?'class="wa-home-nav-selected"':''} target="_self">${page[i]}</a>`;
}
document.querySelector("#navbar").innerHTML = navbartmp;

let headers = new Headers();
headers.append('Content-Type', 'application/json');
let postBody = {
    method: 'POST',
    headers: headers,
    body: null
};