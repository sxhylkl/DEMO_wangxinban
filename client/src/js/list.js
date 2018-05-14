let DATA = {};

window.onload = function() {
    getList();
    setInterval(getList, 1000);
}

function getList() {
    fetch(APIHOST + '/getreport').then(e => e.json()).then(e => {
        // console.log(data);
        DATA = e;
        let data = e.data;
        let now = e.now;
        let list = `<tr>
                        <th>序号</th>
                        <th>单位</th>
                        <th>当前状态</th>
                        <th>绿色未处理</th>
                        <th>黄色未处理</th>
                        <th>红色未处理</th>
                        <th>已处理（删除）</th>
                        <th>已处理（放行）</th>
                    </tr>`;
        let ind = 0;
        for(let i in data) {
            ind ++;
            let newtaskall = data[i].filter(e => e.label == 0 && e.status == "new");
            let newtaskyellow = data[i].filter(e => e.label == 0 && e.status == "new" && (now - e.created) >= YELLOW && (now - e.created) < RED);
            let newtaskred = data[i].filter(e => e.label == 0 && e.status == "new" && (now - e.created) >= RED);
            
            let forbtask = data[i].filter(e => e.label == 0 && e.status == "forbidden");
            let passtask = data[i].filter(e => e.label == 0 && e.status == "pass");

            let statuscls = newtaskred.length > 0 ? 'wxb-list-status-red' : (newtaskyellow.length > 0 ? 'wxb-list-status-yellow' : 'wxb-list-status-green');

            list += `<tr>
                        <td>${ind}</td>
                        <td data-user="${i}" data-url="true">${i} 网站</td>
                        <td><div class='${statuscls}'></div></td>
                        <td data-user="${i}" data-type="newtaskall">${newtaskall.length - newtaskyellow.length - newtaskred.length}</td>
                        <td data-user="${i}" data-type="newtaskyellow">${newtaskyellow.length}</td>
                        <td data-user="${i}" data-type="newtaskred">${newtaskred.length}</td>
                        <td data-user="${i}" data-type="forbtask">${forbtask.length}</td>
                        <td data-user="${i}" data-type="passtask">${passtask.length}</td>
                    </tr>`;
        }

        document.querySelector('#wxb_list_table').innerHTML = list;
        addEvent();
    });
}

function addEvent() {
    document.querySelectorAll('#wxb_list_table td').forEach(e => {
        e.addEventListener('click', event => {
            if(event.target.dataset.type != undefined) {
                showDetail(event.target.dataset.user, event.target.dataset.type);
            }
            if(event.target.dataset.url != undefined) {
                localStorage.user = event.target.dataset.user;
                sessionStorage.user = event.target.dataset.user;
                location.href = "/client.html";
            }
        })
    })
}

function showDetail(user, type) {
    let tmp = `<tr>
                <th>序号</th>
                <th>图像</th>
                <th>创建日期</th>
                <th>状态</th>
            </tr>`;

    let data = [];
    let now = new Date().getTime();
    switch(type) {
        case 'newtaskall':
            data = DATA.data[user].filter(e => e.label == 0 && e.status == "new" && (DATA.now - e.created) < YELLOW);
            break;
        case 'newtaskyellow':
            data = DATA.data[user].filter(e => e.label == 0 && e.status == "new" && (DATA.now - e.created) >= YELLOW && (now - e.created) < RED);
            break;
        case 'newtaskred':
            data = DATA.data[user].filter(e => e.label == 0 && e.status == "new" && (DATA.now - e.created) >= RED);
            break;
        case 'forbtask':
            data = DATA.data[user].filter(e => e.label == 0 && e.status == "forbidden");
            break;
        case 'passtask':
            data = DATA.data[user].filter(e => e.label == 0 && e.status == "pass");
            break;  
    }

    data.map((datum,ind) => {
        tmp += `<tr>
                    <td>${ind+1}</td>
                    <td><img src="${datum.url}" alt="" /></td>
                    <td>${new Date(datum.created)}</td>
                    <td>${datum.status}</td>
                </tr>`
    });

    document.querySelector('#wxb_list_detail_title').innerHTML = user + '网站';
    document.querySelector('#wxb_list_detail_table').innerHTML = tmp;

    document.querySelector('#wxb_list_table_container').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_list_detail_container').removeAttribute('class');
}

document.querySelector('#wxb_list_detail_back').addEventListener('click', (e) => {
    document.querySelector('#wxb_list_table_container').removeAttribute('class');
    document.querySelector('#wxb_list_detail_container').setAttribute('class', 'component-hidden');
})