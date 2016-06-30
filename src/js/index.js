require("jquery");
require("util");
var Vue = require('vue');
new Vue({
    el: '#mainBody',
    data: {
        year: '年份',
        yearList: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
        brand: '品牌',
        brandList: [],
        model: '型号',
        modelList: []
    },
    methods: {
        yearChangeListener: function(e) {
            this.queryBrandByYear();
        },
        queryBrandByYear: function() {
            var self = this;
            var url = "http://120.27.155.121:8080/wheel/wheel/queryBrandByYear?year=" + self.year;
            this.getData(url, function(data) {
                if (data && data.data) {
                    self.brandList = data.data;
                    if (data.data.length > 0) {
                        self.brand = data.data[0];
                    } else {
                        self.brand = "无品牌";
                    }
                    self.queryModelByBrandAndYear()
                }
            })
        },
        queryModelByBrandAndYear: function() {
            var self = this;
            var url = "http://120.27.155.121:8080/wheel/wheel/queryModelByBrandAndYear?year=" + self.year + '&brand=' + self.brand;
            this.getData(url, function(data) {
                if (data && data.data) {
                    self.modelList = data.data;
                    if (data.data.length > 0) {
                        self.model = data.data[0];
                    } else {
                        self.model = "无型号";
                    }
                }
            })
        },
        getData: function(url, dataCallBack) {
            var self = this;
            $.ajax({
                type: "get",
                async: false,
                url: url,
                dataType: "jsonp",
                jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
                jsonpCallback: "callbackForYear", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
                success: function(data) {
                    dataCallBack(data)
                },
                error: function() {
                    alert('fail to load data');
                }
            });
        },
        enterSearch: function() {
            if (this.year == '年份') {
                alert('请选择年份');
                return;
            }
            if (this.brand == "无品牌") {
                alert("该年份无品牌，请重新选择");
                return false;
               }
            location.href = 'productList.html?year=' + this.year + '&brand=' + this.brand + '&model=' + this.model;
        }

    }
})
