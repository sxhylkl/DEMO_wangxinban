APIHOST = (typeof(APIHOST) == 'undefined') ? "" : APIHOST;
let DATA = [];
let IND = null;
let Data_app = [];
let Data_app_detail = [];

window.onload = function() {
    setTimeout(fillListTableApp, 1);
    drawArea();
    drawPie();
    drawRadar();
    // drawTraceMap();
    // setInterval(getList, 1000);
}

function fillListTableApp() {
    let list = `<tr>
                    <th>序号</th>
                    <th>应用名称</th>
                    <th>上传资源数量</th>
                    <th>资源访问总数</th>
                    <th>资源扫描完成率</th>
                    <th>命中违禁资源量</th>
                    <th>活跃用户数</th>
                    <th>应用平台资源健康指数</th>
                    <th>应用平台用户健康指数</th>
                    <th>操作</th>
                </tr>`;
    for(let i in Data_app) {
        list += `<tr>
            <td>${Number(i)+1}</td>
            <td class="wxb-common-hover" data-index="${i}" onclick="goAppPanel()">${Data_app[i].name}</td>
            <td>${Data_app[i].uploadnum}</td>
            <td>${Data_app[i].visitnum}</td>
            <td>${Data_app[i].completerate}</td>
            <td>${Data_app[i].forbidden}</td>
            <td>${Data_app[i].usernum}</td>
            <td>${Data_app[i].appindex}</td>
            <td>${Data_app[i].userindex}</td>
            <td class="wxb-common-hover" data-index="${i}" onclick="alert('报告已生成并发送到相关单位！')">发送通告</td>
        </tr>`;
    }
    document.querySelector('#wxb_list_table').innerHTML = list;

    list = `<tr>
                <th>序号</th>
                <th>资源地址</th>
                <th>资源内容</th>
                <th>上传时间</th>
                <th>访问量</th>
                <th>
                    资源类型
                    <select name="" id="">
                        <option value="图片">全部</option>
                        <option value="图片">图片</option>
                        <option value="视频">视频</option>
                    </select>
                </th>
                <th>
                    违禁类别
                    <select name="" id="">
                        <option value="涉黄">涉黄</option>
                        <option value="涉暴">涉暴</option>
                        <option value="涉政">涉政</option>
                        <option value="低俗">低俗</option>
                    </select>
                </th>
                <th>上传账号</th>
                <th>
                    状态
                    <select name="" id="">
                        <option value="未操作">未操作</option>
                        <option value="已忽略">已忽略</option>
                        <option value="已通告">已通告</option>
                        <option value="已处理">已封禁</option>
                    </select>
                </th>
                <th>操作</th>
            </tr>`;

    for(let i in Data_app_detail) {
        list += `<tr>
            <td>${Number(i)+1}</td>
            <td>${Data_app_detail[i].url}</td>
            <td><img src="/imgs/illegal.png"></td>
            <td>${(new Date()).toJSON().slice(0,-5).replace('T', '  ')}</td>
            <td>${Data_app_detail[i].visitnum}</td>
            <td>${Data_app_detail[i].type}</td>
            <td>${Data_app_detail[i].class}</td>
            <td class="wxb-common-hover" onclick="showUserModal()">${Data_app_detail[i].account}</td>
            <td>${Data_app_detail[i].status}</td>
            <td><span class="wxb-common-hover" data-index="${i}" onclick="toggleReportModal()">发送通告</span> <span class="wxb-common-hover" >忽略</span></td>
        </tr>`;
    }
    document.querySelector('#wxb_list_app_table').innerHTML = list;


    list = `<tr>
                    <th>序号</th>
                    <th>资源地址</th>
                    <th>资源内容</th>
                    <th>上传时间</th>
                    <th>访问量</th>
                    <th>
                        资源类型
                        <select name="" id="">
                            <option value="图片">全部</option>
                            <option value="图片">图片</option>
                            <option value="视频">视频</option>
                        </select>
                    </th>
                    <th>上传账号</th>
                    <th>
                        状态
                        <select name="" id="">
                            <option value="未操作">未操作</option>
                            <option value="已忽略">已忽略</option>
                            <option value="已通告">已通告</option>
                            <option value="已处理">已封禁</option>
                        </select>
                    </th>
                    <th>操作</th>
                </tr>`;
    for(let i in Data_app_detail) {
        list += `<tr>
        <td>${Number(i)+1}</td>
        <td>${Data_app_detail[i].url}</td>
        <td><img src="/imgs/illegal.png"></td>
        <td>${(new Date()).toJSON().slice(0,-5).replace('T', '  ')}</td>
        <td>${Data_app_detail[i].visitnum}</td>
        <td>${Data_app_detail[i].type}</td>
        <td class="wxb-common-hover" onclick="showUserModal()">${Data_app_detail[i].account}</td>
        <td>${Data_app_detail[i].status}</td>
        <td><span class="wxb-common-hover" data-index="${i}" onclick="toggleReportModal()">发送通告</span> <span class="wxb-common-hover" >忽略</span></td>
        </tr>`;
    }
    document.querySelector('#wxb_list_event_table').innerHTML = list;
}


function fillListTableUser() {
    let list = `<tr>
                    <th>序号</th>
                    <th>平台</th>
                    <th>账号</th>
                    <th>上传数量</th>
                    <th>上传违禁资源数量</th>
                    <th>资源访问总量</th>
                    <th>违禁资源访问总量</th>
                    <th>账户活跃度</th>
                    <th>账户设备数</th>
                    <th>账户接入点区域覆盖</th>
                    <th>账户分类</th>
                    <th>账户监控指数</th>
                    <th>操作</th>
                </tr>`;
    for(let i in Data_user) {
        list += `<tr>
            <td>${Number(i)+1}</td>
            <td>${Data_user[i].app}</td>
            <td class="wxb-common-hover"  data-index="${i}" onclick="showUserModal()">${Data_user[i].name}</td>
            <td>${Data_user[i].uploadnum}</td>
            <td>${Data_user[i].uploadissue}</td>
            <td>${Data_user[i].visitnum}</td>
            <td>${Data_user[i].visitissue}</td>
            <td>${Data_user[i].activity}</td>
            <td>${Data_user[i].device}</td>
            <td>${Data_user[i].city}</td>
            <td>${Data_user[i].type}</td>
            <td>${Data_user[i].userindex}</td>
            <td class="wxb-common-hover" data-index="${i}" onclick="alert('报告已生成并发送到相关单位！')">发送报告</td>
        </tr>`;
    }

    document.querySelector('#wxb_list_table').innerHTML = list;
}

function fillListTableEvent() {
    let list = `<tr>
        <th>序号</th>
        <th>任务名称</th>
        <th>相关应用数量</th>
        <th>违禁内容总量</th>
        <th>已处置数量</th>
        <th>操作</th>
    </tr>`;
    for(let i in Data_events) {
        list += `<tr>
        <td>${Number(i)+1}</td>
            <td class="wxb-common-hover"  data-index="${i}" onclick="goEventPanel()">${Data_events[i].name}</td>
            <td>${Data_events[i].issueapp}</td>
            <td>${Data_events[i].issuenum}</td>
            <td>${Data_events[i].handlenum}</td>
            <td class="wxb-common-hover" data-index="${i}" onclick="alert('报告已生成并发送到相关单位！')">发送报告</td>
        </tr>`;
    }

    document.querySelector('#wxb_list_table').innerHTML = list;
    // addEvent();
}

document.querySelector('#wxb_list_tab_app_label').addEventListener('click', () => {
    console.log('click app');
    fillListTableApp();
});

document.querySelector('#wxb_list_tab_user_label').addEventListener('click', () => {
    fillListTableUser();
});

document.querySelector('#wxb_list_tab_event_label').addEventListener('click', () => {
    fillListTableEvent();
});

function addEvent() {
    document.querySelectorAll('#wxb_list_table td:nth-of-type(2)').forEach(e => {
        e.addEventListener('click', event => {
            if(event.target.dataset.index != undefined) {
                IND = event.target.dataset.index;
                showDetail(DATA[event.target.dataset.index].items);
                document.querySelector('#wxb_task_createpanel_title').value = DATA[event.target.dataset.index].name
                document.querySelector('#wxb_list_table_container').setAttribute('class', 'component-hidden');
                document.querySelector('#wxb_task_modal_apppanel').removeAttribute('class');
            }
        });
    });
}

function showDetail(data) {
    let tmp = `<tr>
                <th>序号</th>
                <th>监控域名</th>
                <th>创建日期</th>
                <th>状态</th>
                <th>违禁内容</th>
                <th>已处置</th>
                <th>发送通知</th>
            </tr>`;

    data.map((datum,ind) => {
        tmp += `<tr>
                    <td>${ind+1}</td>
                    <td>${datum.domain}</td>
                    <td>${datum.create}</td>
                    <td>${datum.status}</td>
                    <td class="wxb-common-hover" onclick="goTaskDetailPanel(event)">${datum.badnum}</td>
                    <td>${Math.floor(datum.badnum*.5)}</td>
                    <td class="wxb-common-hover" onclick="alert('报告已生成并发送到相关单位！')">发送</td>
                </tr>`
    });

    document.querySelector('#wxb_task_detail_table').innerHTML = tmp;
}

document.querySelectorAll('.js-wxb-task-modal-back').forEach(e => e.addEventListener('click', (e) => {
    document.querySelector('#wxb_list_table_container').removeAttribute('class');
    document.querySelector('#wxb_task_modal_apppanel').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_task_modal_userpanel').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_task_modal_eventpanel').setAttribute('class', 'component-hidden');
}));


// document.querySelector('#wxb_task_createpanel_addsite').addEventListener('click', (e) => {
//     let title = document.querySelector('#wxb_task_createpanel_title').value;
//     let domain = document.querySelector('#wxb_task_createpanel_domain').value;
//     createTask(title, domain=='' ? []:[domain]);
// });

// function createTask(title, domain) {
//     if(title == '') {
//         alert('任务名称不能为空!');
//         return;
//     }

//     if(IND == null) {
//         IND = DATA.length;
//         DATA.push({
//             taskid: Number(DATA.slice(-1)[0].taskid) + 1,
//             name: title,
//             sitenum: 0,
//             healthnum: 0,
//             issuenum: 0,
//             badnum: 0,
//             items: []
//         });
//     } else {
//         DATA[IND].name = title;
//     }

//     if(domain.length > 0) {
//         for(let dom of domain) {
//             DATA[IND].items.push({
//                 domain: dom,
//                 create: (new Date()).toISOString().slice(0,10),
//                 status: '健康',
//                 badnum: 0
//             });
    
//             DATA[IND].sitenum += 1;
//             DATA[IND].healthnum += 1;
//         }
//     }

//     updateList();
//     document.querySelector('#wxb_task_createpanel_domain').value = '';
//     showDetail(DATA[IND].items);
// }

// function deleteTask(event) {
//     DATA.splice(event.target.dataset.index, 1);
//     updateList();
// }

// function updateList() {
//     postBody.body = JSON.stringify({tasklist:DATA});
//     fetch(APIHOST + '/updatetasklist', postBody).then(e => {
//         console.log('done');
//     });
//     fillListTable(DATA);
// }

document.querySelector('#wxb_list_modal_detail_trace').addEventListener('click', (e) => {
    document.querySelector('#wxb_list_modal_detail_trace').setAttribute('class', 'component-hidden');
});

document.querySelector('#tracemap').addEventListener('click', (e) => {
    e.stopPropagation();
});


document.querySelector('#wxb_list_modal_user_detail').addEventListener('click', (e) => {
    document.querySelector('#wxb_list_modal_user_detail').setAttribute('class', 'component-hidden');
});

document.querySelector('#wxb_list_modal_user_detail .wxb-list-model-container').addEventListener('click', (e) => {
    e.stopPropagation();
});



// ========= add list modal open ===========
// document.querySelector('#wxb_task_createpanel_openlist').addEventListener('click', (e) => {
//     document.querySelectorAll('#wxb_list_modal_addlist input').forEach(e => {
//         e.checked = false;
//     });
//     document.querySelector('#wxb_list_modal_addlist').removeAttribute('class');
// });

// document.querySelector('#wxb_task_modal_addlist_submit').addEventListener('click', (e) => {
//     let domain = [];
//     document.querySelectorAll('#wxb_list_modal_addlist input:checked').forEach(e => {
//         domain.push(e.parentElement.parentElement.nextSibling.nextSibling.innerText);
//     });
//     let title = document.querySelector('#wxb_task_createpanel_title').value;
//     createTask(title, domain);
//     document.querySelector('#wxb_list_modal_addlist').setAttribute('class', 'component-hidden');
// });

function showDetailModal() {
    document.querySelector('#wxb_list_modal_addlist').removeAttribute('class');
}

function showUserModal() {
    document.querySelector('#wxb_list_modal_user_detail').classList.toggle('component-hidden');
}

function toggleReportModal() {
    document.querySelector('#wxb_list_modal_report').classList.toggle('component-hidden');
}

document.querySelector('#wxb_list_modal_addlist').addEventListener('click', (e) => {
    document.querySelector('#wxb_list_modal_addlist').setAttribute('class', 'component-hidden');
});

document.querySelector('#wxb_list_applist').addEventListener('click', (e) => {
    e.stopPropagation();
});

document.querySelector('#wxb_list_modal_report').addEventListener('click', (e) => {
    document.querySelector('#wxb_list_modal_report').setAttribute('class', 'component-hidden');
});

document.querySelector('#wxb_list_modal_report .wxb-list-model-container').addEventListener('click', (e) => {
    e.stopPropagation();
});


// ========= add list modal close ===========


// random increase number
// function autoIncrease() {
//     let ind = Math.ceil(Math.random() * DATA.length);
//     document.querySelectorAll('#wxb_list_table td:nth-of-type(6)').forEach(e => {
//         e.removeAttribute('class');
//     });
//     document.querySelectorAll('#wxb_list_table tr')[ind].children[5].setAttribute('class', 'biggerTrans');
//     document.querySelectorAll('#wxb_list_table tr')[ind].children[5].innerHTML = Number(document.querySelectorAll('#wxb_list_table tr')[ind].children[5].innerHTML) + Math.ceil(Math.random()*10);
// }
// setInterval(autoIncrease, 1000);


function goAppPanel(event) {
    document.querySelector('#wxb_list_table_container').classList.toggle('component-hidden');
    document.querySelector('#wxb_task_modal_apppanel').classList.toggle('component-hidden');
    console.log(event);
}

function goEventPanel(event) {
    document.querySelector('#wxb_list_table_container').classList.toggle('component-hidden');
    document.querySelector('#wxb_task_modal_eventpanel').classList.toggle('component-hidden');
    console.log(event);
}

function goTaskDetailPanel(event) {
    document.querySelector('#wxb_list_table_container').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_task_modal_apppanel').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_task_modal_detaillist').removeAttribute('class');
    console.log(event);
}

function showTraceMap() {
    drawTraceMap();
    document.querySelector('#wxb_list_modal_detail_trace').removeAttribute('class');
}

function drawTraceMap() {
    var dom = document.getElementById("tracemap");
    var myChart = echarts.init(dom);
    option = null;
    myChart.showLoading();
    fetch(APIHOST + '/tracedata').then(e => e.text()).then(xml => {
        myChart.hideLoading();

        var graph = echarts.dataTool.gexf.parse(xml);
        graph.links.map(item => {
            item.source = Math.floor(Math.random()*76);
            item.target = Math.floor(Math.random()*76);
        });
        graph.nodes.map(item => {
            item.name = `IP:${Math.floor(Math.random()*1000)}.${Math.floor(Math.random()*1000)}.${Math.floor(Math.random()*1000)}.${Math.floor(Math.random()*1000)}`
            item.symbolSize = graph.links.filter(e => e.target == item.id || e.source == item.id).length * 5;
        });
        var categories = [];
        for (var i = 0; i < 9; i++) {
            categories[i] = {
                name: '类目' + i
            };
        }
        graph.nodes.forEach(function (node) {
            node.itemStyle = null;
            node.value = node.symbolSize;
            node.symbolSize /= 1.5;
            node.label = {
                normal: {
                    show: node.symbolSize > 30
                }
            };
            node.category = node.attributes.modularity_class;
        });
        option = {
            title: {
                text: '传播节点图',
                top: 'top',
                left: 'middle'
            },
            tooltip: {},
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    name: '传播节点',
                    type: 'graph',
                    layout: 'none',
                    data: graph.nodes,
                    links: graph.links,
                    categories: categories,
                    roam: true,
                    focusNodeAdjacency: true,
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 1,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    },
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    },
                    emphasis: {
                        lineStyle: {
                            width: 10
                        }
                    }
                }
            ]
        };

        myChart.setOption(option);
    }, 'xml');;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawArea() {
    var dom = document.getElementById("wxb_list_modal_detail_map");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    var base = +new Date(2016, 0, 0);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 1000];

    for (var i = 1; i < 980; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.49) * 20 + data[i - 1]));
    }

    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '90%'];
            }
        },
        title: {
            left: 'center',
            text: '有害数据历史查处走势图',
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: 900
        }, {
            start: 0,
            end: 900,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }],
        series: [
            {
                name:'模拟数据',
                type:'line',
                smooth:true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: data
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawPie() {
    var dom = document.getElementById("wxb_list_modal_detail_pie");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        backgroundColor: '#2c343c',

        title: {
            text: '查处问题视频分布',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [
            {
                name:'分类信息',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'涉政视频'},
                    {value:310, name:'低俗视频'},
                    {value:274, name:'恐怖袭击视频'},
                    {value:235, name:'反华视频'},
                    {value:400, name:'淫秽视频'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawRadar() {
    var dom = document.getElementById("wxb_list_modal_detail_radar");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    option = {
        title: {
            text: '账户雷达图',
            subtext: '',
            top: 0,
            left: 60
        },
        tooltip: {
            trigger: 'item',
            backgroundColor : 'rgba(0,0,250,0.2)'
        },
        visualMap: {
            top: 'middle',
            right: 10,
            color: ['red', 'yellow'],
            calculable: true
        },
        radar: {
            indicator : [
                { text: '上传指数', max: 400},
                { text: '活跃度', max: 400},
                { text: '访问指数', max: 400},
                { text: '设备数', max: 400},
                { text: '危害力度', max: 400}
            ]
        },
        series : (function (){
            var series = [];
            for (var i = 1; i <= 28; i++) {
                series.push({
                    name:'能力雷达图',
                    type: 'radar',
                    symbol: 'none',
                    lineStyle: {
                        width: 1
                    },
                    emphasis: {
                        areaStyle: {
                            color: 'rgba(0,250,0,0.3)'
                        }
                    },
                    data:[
                    {
                        value:[
                            (40 - i) * 10,
                            (38 - i) * 4 + 60,
                            i * 5 + 10,
                            i * 9,
                            i * i /2
                        ],
                        name: i + 2000 + ''
                    }
                    ]
                });
            }
            return series;
        })()
    };;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

Data_app = [
    {name: '抖音',      uploadnum: 4215, visitnum: 22255, completerate: '80%', forbidden: 150, usernum: 7500, appindex: 8.2, userindex: 7.6},
    {name: '快手',      uploadnum: 4225, visitnum: 12255, completerate: '80%', forbidden: 250, usernum: 5200, appindex: 8.3, userindex: 7.3},
    {name: '斗鱼',      uploadnum: 4325, visitnum: 21155, completerate: '80%', forbidden: 150, usernum: 4500, appindex: 8.1, userindex: 7.1},
    {name: '火山小视频', uploadnum: 4215, visitnum: 11155, completerate: '80%', forbidden: 90, usernum: 2500, appindex: 8.0, userindex: 7.9}
];

Data_app_detail = [
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'},
    {url: 'http://douyin.com/video/2839288==', visitnum: 200, type: '视频', class: '涉黄', account: 'alpha', status: '未封禁'}
]

Data_user = [
    {app: '抖音', name: 'alpha',    uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '抖音', name: 'beta',     uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '快手', name: 'gamma',    uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '斗鱼', name: 'delta',    uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '抖音', name: 'epsilon',  uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '快手', name: 'zeta',     uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '斗鱼', name: 'eta',      uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '斗鱼', name: 'Theta',    uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '抖音', name: 'phi',      uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '快手', name: 'kappa',    uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '斗鱼', name: 'lambda',   uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9},
    {app: '抖音', name: 'mu',       uploadnum: 100, uploadissue: 30, visitnum: 300, visitissue: 150, activity: 8.8, device: 6, phonenum: 18612345678, city: '北京', type: '涉黄', userindex: 7.9}
];

Data_events = [
    {name: '昆山恶霸反杀事件',   issuenum: 1115, handlenum: 500, issueapp: 30},
    {name: '毒疫苗事件',   issuenum: 1008, handlenum: 488, issueapp: 28},
    {name: '滴滴司机奸杀事件',   issuenum: 985,  handlenum: 477, issueapp: 24},
    {name: '刘强东性侵大学生',   issuenum: 885,  handlenum: 466, issueapp: 23}
];