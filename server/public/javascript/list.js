APIHOST = (typeof(APIHOST) == 'undefined') ? "" : APIHOST;
let DATA = [];
let IND = null;
let Data_app = [];

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
        <th>违禁内容总量</th>
        <th>已处置数量</th>
        <th>操作</th>
    </tr>`;
    for(let i in Data_app) {
        list += `<tr>
            <td>${Number(i)+1}</td>
            <td class="wxb-common-hover" data-index="${i}" onclick="showDetailModal()">${Data_app[i].name}</td>
            <td>${Data_app[i].issuenum}</td>
            <td>${Data_app[i].handlenum}</td>
            <td class="wxb-common-hover" data-index="${i}" onclick="alert('报告已生成并发送到相关单位！')">发送报告</td>
        </tr>`;
    }

    document.querySelector('#wxb_list_table').innerHTML = list;
    // addEvent();
}


function fillListTableZone() {
    let list = `<tr>
        <th>序号</th>
        <th>地区</th>
        <th>相关应用数量</th>
        <th>违禁内容总量</th>
        <th>已处置数量</th>
        <th>操作</th>
    </tr>`;
    for(let i in Data_zone) {
        list += `<tr>
            <td>${Number(i)+1}</td>
            <td class="wxb-common-hover"  data-index="${i}" onclick="showDetailModal()">${Data_zone[i].name}</td>
            <td>${Data_zone[i].issueapp}</td>
            <td>${Data_zone[i].issuenum}</td>
            <td>${Data_zone[i].handlenum}</td>
            <td class="wxb-common-hover" data-index="${i}" onclick="alert('报告已生成并发送到相关单位！')">发送报告</td>
        </tr>`;
    }

    document.querySelector('#wxb_list_table').innerHTML = list;
    // addEvent();
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
            <td class="wxb-common-hover"  data-index="${i}" onclick="showDetailModal()">${Data_events[i].name}</td>
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

document.querySelector('#wxb_list_tab_zone_label').addEventListener('click', () => {
    fillListTableZone();
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
                document.querySelector('#wxb_task_modal_createpanel').removeAttribute('class');
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

// document.querySelector('#wxb_task_btn_createtask').addEventListener('click', (e) => {
//     IND = null;
//     document.querySelector('#wxb_task_createpanel_title').value = '';
//     document.querySelector('#wxb_task_detail_table').innerHTML = `<tr><th>序号</th><th>任务名称</th><th>监控站点数量</th><th>健康站点数量</th><th>问题站点数量</th><th>违禁内容总量</th><th>生成并导出报告</th></tr>`;
//     document.querySelector('#wxb_task_modal_createpanel').removeAttribute('class');
//     document.querySelector('#wxb_list_table_container').setAttribute('class', 'component-hidden');
// });

document.querySelectorAll('.js-wxb-task-modal-back').forEach(e => e.addEventListener('click', (e) => {
    document.querySelector('#wxb_list_table_container').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_task_modal_createpanel').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_task_modal_detaillist').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_list_modal_detail_trace').setAttribute('class', 'component-hidden');
    if(e.target.dataset['path'] == 1) {
        document.querySelector('#wxb_list_table_container').removeAttribute('class');
    } else if (e.target.dataset['path'] == 2) {
        document.querySelector('#wxb_task_modal_createpanel').removeAttribute('class');
    } else {
        document.querySelector('#wxb_task_modal_detaillist').removeAttribute('class');
    }
}));


document.querySelector('#wxb_task_createpanel_addsite').addEventListener('click', (e) => {
    let title = document.querySelector('#wxb_task_createpanel_title').value;
    let domain = document.querySelector('#wxb_task_createpanel_domain').value;
    createTask(title, domain=='' ? []:[domain]);
});

function createTask(title, domain) {
    if(title == '') {
        alert('任务名称不能为空!');
        return;
    }

    if(IND == null) {
        IND = DATA.length;
        DATA.push({
            taskid: Number(DATA.slice(-1)[0].taskid) + 1,
            name: title,
            sitenum: 0,
            healthnum: 0,
            issuenum: 0,
            badnum: 0,
            items: []
        });
    } else {
        DATA[IND].name = title;
    }

    if(domain.length > 0) {
        for(let dom of domain) {
            DATA[IND].items.push({
                domain: dom,
                create: (new Date()).toISOString().slice(0,10),
                status: '健康',
                badnum: 0
            });
    
            DATA[IND].sitenum += 1;
            DATA[IND].healthnum += 1;
        }
    }

    updateList();
    document.querySelector('#wxb_task_createpanel_domain').value = '';
    showDetail(DATA[IND].items);
}

function deleteTask(event) {
    DATA.splice(event.target.dataset.index, 1);
    updateList();
}

function updateList() {
    postBody.body = JSON.stringify({tasklist:DATA});
    fetch(APIHOST + '/updatetasklist', postBody).then(e => {
        console.log('done');
    });
    fillListTable(DATA);
}

document.querySelector('#wxb_list_modal_detail_trace').addEventListener('click', (e) => {
    document.querySelector('#wxb_list_modal_detail_trace').setAttribute('class', 'component-hidden');
});

document.querySelector('#tracemap').addEventListener('click', (e) => {
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

document.querySelector('#wxb_list_modal_addlist').addEventListener('click', (e) => {
    document.querySelector('#wxb_list_modal_addlist').setAttribute('class', 'component-hidden');
});

document.querySelector('#wxb_list_applist').addEventListener('click', (e) => {
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


function goTaskDetailPanel(event) {
    document.querySelector('#wxb_list_table_container').setAttribute('class', 'component-hidden');
    document.querySelector('#wxb_task_modal_createpanel').setAttribute('class', 'component-hidden');
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
            text: '健康指数雷达图',
            subtext: '',
            top: 10,
            left: 10
        },
        tooltip: {
            trigger: 'item',
            backgroundColor : 'rgba(0,0,250,0.2)'
        },
        // legend: {
        //     type: 'scroll',
        //     bottom: 10,
        //     data: (function (){
        //         var list = [];
        //         for (var i = 1; i <=28; i++) {
        //             list.push(i + 2000 + '');
        //         }
        //         return list;
        //     })()
        // },
        visualMap: {
            top: 'middle',
            right: 10,
            color: ['red', 'yellow'],
            calculable: true
        },
        radar: {
        indicator : [
            { text: '自监控能力', max: 400},
            { text: '及时处置能力', max: 400},
            { text: '响应能力', max: 400},
            { text: '扩散能力', max: 400},
            { text: '社会影响力', max: 400}
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
    {name: '优酷视频', issuenum: 1115, handlenum: 500, issueapp: 30},
    {name: '腾讯视频', issuenum: 1008, handlenum: 488, issueapp: 28},
    {name: '爱奇艺', issuenum: 985, handlenum: 477, issueapp: 24},
    {name: '土豆视频', issuenum: 885, handlenum: 466, issueapp: 23},
    {name: '熊猫TV', issuenum: 875, handlenum: 444, issueapp: 22},
    {name: 'PPTV', issuenum: 765, handlenum: 422, issueapp: 21},
    {name: 'bilibili', issuenum: 745, handlenum: 388, issueapp: 19},
    {name: '56视频', issuenum: 695, handlenum: 366, issueapp: 18},
    {name: '6间房', issuenum: 615, handlenum: 355, issueapp: 17},
    {name: '芒果TV', issuenum: 555, handlenum: 333, issueapp: 16},
    {name: '暴风视频', issuenum: 545, handlenum: 311, issueapp: 15},
    {name: '搜狐视频', issuenum: 515, handlenum: 299, issueapp: 14},
    {name: '新浪视频', issuenum: 475, handlenum: 288, issueapp: 14},
    {name: 'hao123', issuenum: 465, handlenum: 277, issueapp: 14},
    {name: '乐视', issuenum: 445, handlenum: 266, issueapp: 13},
    {name: '抖音', issuenum: 425, handlenum: 255, issueapp: 13},
    {name: '虎嗅', issuenum: 245, handlenum: 244, issueapp: 12},
    {name: '斗鱼', issuenum: 225, handlenum: 233, issueapp: 12},
    {name: '1644', issuenum: 125, handlenum: 222, issueapp: 12},
    {name: 'acfun', issuenum: 115, handlenum: 211, issueapp: 11}
];

Data_zone = [
    {name: '北京市', issuenum: 1115, handlenum: 500, issueapp: 30},
    {name: '深圳市', issuenum: 1008, handlenum: 488, issueapp: 28},
    {name: '广州市', issuenum: 985, handlenum: 477, issueapp: 24},
    {name: '上海市', issuenum: 885, handlenum: 466, issueapp: 23},
    {name: '杭州市', issuenum: 875, handlenum: 444, issueapp: 22},
    {name: '武汉市', issuenum: 765, handlenum: 422, issueapp: 21},
    {name: '天津市', issuenum: 745, handlenum: 388, issueapp: 19},
    {name: '重庆市', issuenum: 695, handlenum: 366, issueapp: 18},
    {name: '南京市', issuenum: 615, handlenum: 355, issueapp: 17},
    {name: '苏州市', issuenum: 555, handlenum: 333, issueapp: 16},
    {name: '西安市', issuenum: 545, handlenum: 311, issueapp: 15},
    {name: '长沙市', issuenum: 515, handlenum: 299, issueapp: 14},
    {name: '沈阳市', issuenum: 475, handlenum: 288, issueapp: 14},
    {name: '青岛市', issuenum: 465, handlenum: 277, issueapp: 14},
    {name: '郑州市', issuenum: 445, handlenum: 266, issueapp: 13},
    {name: '大连市', issuenum: 425, handlenum: 255, issueapp: 13},
    {name: '东莞市', issuenum: 245, handlenum: 244, issueapp: 12},
    {name: '宁波市', issuenum: 225, handlenum: 233, issueapp: 12},
    {name: '厦门市', issuenum: 125, handlenum: 222, issueapp: 12},
    {name: '合肥市', issuenum: 115, handlenum: 211, issueapp: 11}
];

Data_events = [
    {name: '自定义事件1', issuenum: 1115, handlenum: 500, issueapp: 30},
    {name: '自定义事件2', issuenum: 1008, handlenum: 488, issueapp: 28},
    {name: '自定义事件3', issuenum: 985, handlenum: 477, issueapp: 24},
    {name: '自定义事件4', issuenum: 885, handlenum: 466, issueapp: 23},
    {name: '自定义事件5', issuenum: 875, handlenum: 444, issueapp: 22},
    {name: '自定义事件6', issuenum: 765, handlenum: 422, issueapp: 21},
    {name: '自定义事件7', issuenum: 745, handlenum: 388, issueapp: 19},
    {name: '自定义事件8', issuenum: 695, handlenum: 366, issueapp: 18},
    {name: '自定义事件9', issuenum: 615, handlenum: 355, issueapp: 17},
    {name: '自定义事件10', issuenum: 555, handlenum: 333, issueapp: 16},
    {name: '自定义事件11', issuenum: 545, handlenum: 311, issueapp: 15},
    {name: '自定义事件12', issuenum: 515, handlenum: 299, issueapp: 14},
    {name: '自定义事件13', issuenum: 475, handlenum: 288, issueapp: 14},
    {name: '自定义事件14', issuenum: 465, handlenum: 277, issueapp: 14},
    {name: '自定义事件15', issuenum: 445, handlenum: 266, issueapp: 13},
    {name: '自定义事件16', issuenum: 425, handlenum: 255, issueapp: 13},
    {name: '自定义事件17', issuenum: 245, handlenum: 244, issueapp: 12},
    {name: '自定义事件18', issuenum: 225, handlenum: 233, issueapp: 12},
    {name: '自定义事件19', issuenum: 125, handlenum: 222, issueapp: 12},
    {name: '自定义事件20', issuenum: 115, handlenum: 211, issueapp: 11}
];