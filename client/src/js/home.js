window.onload = function() {
    getReport().then(report => {
        let wxbpie = [0,0,0];
        let static = [0,0,0];
        let wxbrank = [];
        for(let i in report) {
            if(report[i].newtaskred > 0) {
                wxbpie[2]++;
            } else if (report[i].newtaskyellow > 0) {
                wxbpie[1]++;
            } else {
                wxbpie[0]++;
            }

            static[1] += report[i].newtaskall;
            static[2] += (report[i].forbtask + report[i].passtask);

            wxbrank.push({user: i, num: report[i].newtaskall});
        }
        static[0] = static[1] + static[2];
        fillStatic(static.concat(wxbpie));

        pieChart(wxbpie);
        
        wxbrank.sort((a,b) => {return a.num - b.num})
        getRank(wxbrank);

        stackbar();
        dashboard();
    });
}

function pieChart(data) {
    var dom = document.getElementById("wxb_home_piechart");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '环形图';
    
    option = {
        title: {
            text: '当日平台入网网站状态比例图',
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            data:['正常','预警','警告']
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:data[0], name:'正常'},
                    {value:data[1], name:'预警'},
                    {value:data[2], name:'警告'}
                ],
                color: ['green','yellow', 'red']
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function stackbar() {
    var dom = document.getElementById("wxb_home_stackbar");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '堆叠条形图';

    option = {
        title: {
            text: '最近七日全平台监测处理情况'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  {
            type: 'value'
        },
        xAxis: {
            type: 'category',
            data: ['2018/05/10','2018/05/11','2018/05/12','2018/05/13','2018/05/14','2018/05/15','2018/05/16']
        },
        series: [
            {
                name: '已处理',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '未处理',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function getRank(data) {
    let y = data.map(e => {return e.user+' 网站'});
    let x = data.map(e => {return e.num});

    var dom = document.getElementById("wxb_home_rankbar");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '今日查处问题内容排行';

    option = {
        title: {
            text: '今日查处问题内容排行'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // legend: {
        //     data: ['2011年', '2012年']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: y
        },
        series: [
            {
                name: '2011年',
                type: 'bar',
                data: x
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function stackbar(data) {
    var dom = document.getElementById("wxb_home_stackbar");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '堆叠条形图';

    option = {
        title: {
            text: '最近七日检测处理情况'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  {
            type: 'value'
        },
        xAxis: {
            type: 'category',
            data: ['2018/05/10','2018/05/11','2018/05/12','2018/05/13','2018/05/14','2018/05/15','2018/05/16']
        },
        series: [
            {
                name: '已处理',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '未处理',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function dashboard() {
    var dom = document.getElementById("wxb_home_dashboard");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '今日查处问题内容排行';

    option = {
        tooltip : {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
            show: true,
            feature: {
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series : [
            {
                name: '速度',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 220,
                splitNumber: 11,
                radius: '50%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    backgroundColor: 'auto',
                    borderRadius: 2,
                    color: '#eee',
                    padding: 3,
                    textShadowBlur: 2,
                    textShadowOffsetX: 1,
                    textShadowOffsetY: 1,
                    textShadowColor: '#222'
                },
                title : {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic'
                },
                detail : {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    formatter: function (value) {
                        value = (value + '').split('.');
                        value.length < 2 && (value.push('00'));
                        return ('00' + value[0]).slice(-2)
                            + '.' + (value[1] + '00').slice(0, 2);
                    },
                    fontWeight: 'bolder',
                    borderRadius: 3,
                    backgroundColor: '#444',
                    borderColor: '#aaa',
                    shadowBlur: 5,
                    shadowColor: '#333',
                    shadowOffsetX: 0,
                    shadowOffsetY: 3,
                    borderWidth: 2,
                    textBorderColor: '#000',
                    textBorderWidth: 2,
                    textShadowBlur: 2,
                    textShadowColor: '#fff',
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 0,
                    fontFamily: 'Arial',
                    width: 100,
                    color: '#eee',
                    rich: {}
                },
                data:[{value: 40, name: 'rpm'}]
            },
            {
                name: '转速',
                type: 'gauge',
                center: ['20%', '55%'],    // 默认全局居中
                radius: '35%',
                min:0,
                max:100,
                startAngle:225,
                endAngle:45,
                splitNumber:10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length:12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length:20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width:5
                },
                title: {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                },
                detail: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder'
                },
                data:[{value: 1.5, name: 'cpu'}]
            },
            {
                name: '油表',
                type: 'gauge',
                center: ['77%', '50%'],    // 默认全局居中
                radius: '25%',
                min: 0,
                max: 2,
                startAngle: 135,
                endAngle: 45,
                splitNumber: 2,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,
                    length: 10,        // 属性length控制线长
                    lineStyle: {        // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter:function(v){
                        switch (v + '') {
                            case '0' : return 'E';
                            case '1' : return 'GPU Memory';
                            case '2' : return 'F';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width:2
                },
                title : {
                    show: false
                },
                detail : {
                    show: false
                },
                data:[{value: 0.5, name: 'gas'}]
            },
            {
                name: '水表',
                type: 'gauge',
                center : ['77%', '50%'],    // 默认全局居中
                radius : '25%',
                min: 0,
                max: 2,
                startAngle: 315,
                endAngle: 225,
                splitNumber: 2,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter:function(v){
                        switch (v + '') {
                            case '0' : return 'H';
                            case '1' : return 'GPU';
                            case '2' : return 'C';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width:2
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                data:[{value: 0.5, name: 'memory'}]
            }
        ]
    };
    
    setInterval(function (){
        option.series[0].data[0].value = (Math.random()*100).toFixed(0) - 0;
        option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
        option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
        option.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
        myChart.setOption(option,true);
    },5000);
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function getReport() {
    return new Promise(function(resolve, reject){
        fetch(APIHOST + '/getreport').then(e => e.json()).then(data => {
            let now = data.now;
            data = data.data;
            let report = {
                xx:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}, yy:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}, zz:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}, ww:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}, aa:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}, bb:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}, cc:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}, dd:{newtaskall:0,newtaskyellow:0,newtaskred:0,forbtask:0,passtask:0}
            }
            
            for(let i in data) {
                report[i].newtaskall = data[i].filter(e => e.label == 0 && e.status == "new").length;
                report[i].newtaskyellow = data[i].filter(e => e.label == 0 && e.status == "new" && (now - e.created) >= YELLOW && (now - e.created) < RED).length;
                report[i].newtaskred = data[i].filter(e => e.label == 0 && e.status == "new" && (now - e.created) >= RED).length;
                
                report[i].forbtask = data[i].filter(e => e.label == 0 && e.status == "forbidden").length;
                report[i].passtask = data[i].filter(e => e.label == 0 && e.status == "pass").length;
            }
    
            resolve(report);
        });
    })
    
}

function fillStatic(data) {
    let item = document.querySelectorAll('#wxb_home_static_table tr');
    item[0].children.item(1).innerHTML = data[0];
    item[1].children.item(1).innerHTML = data[1]+'/'+data[0];
    item[2].children.item(1).innerHTML = data[2]+'/'+data[0];
    item[3].children.item(1).innerHTML = data[3]+'/'+(data[3]+data[4]+data[5]);
    item[4].children.item(1).innerHTML = data[4]+'/'+(data[3]+data[4]+data[5]);
    item[5].children.item(1).innerHTML = data[5]+'/'+(data[3]+data[4]+data[5]);
}