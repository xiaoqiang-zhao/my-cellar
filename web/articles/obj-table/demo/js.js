/**
 * Created by zhaoxiaoqiang on 16/6/9.
 */

var simpleData = [
    {
        //a: 'AAA',
        b: [
            {
                b1: 'B1',
                b1Name: 'name'
            },
            {
                b1: 'B1',
                b1Name: 'name'
            }
        ],
        c: 'CCC'
    },
    {
        a: 'AAA',
        b: [
            {
                b1: 'B1',
                b1Name: 'name'
            },
            {
                b1: 'B1',
                b1Name: 'name'
            }
        ],
        c: 'CCC'
    }
];
var complexData = {
        "status": 0,
        "msg": "",
        "data": {
            "poiInfo": {
                "nuoid": "1464330183162384",
                "poiInfo": [
                    {
                        "city": "\u5317\u6d77\u5e02",
                        "name": "\u827e\u4f9d\u683c\u8863\u67dc(\u5317\u6d77\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [],
                        "otherZx": []
                    },
                    {
                        "city": "\u5317\u4eac\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u5317\u4eac\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u957f\u6625\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u957f\u6625\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u957f\u6c99\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u957f\u6c99\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u5927\u8fde\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u5927\u8fde\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u4e1c\u839e\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u4e1c\u839e\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u5e7f\u5dde\u5e02",
                        "name": "\u827e\u4f9d\u683c\u8863\u67dc(\u5e7f\u5dde\u5e97)",
                        "catagorys": [{"id": 1012, "parentId": 316, "catagoryName": "\u5bb6\u5c45\u5bb6\u5177"}, {
                            "id": 316,
                            "parentId": 0,
                            "catagoryName": "\u751f\u6d3b\u670d\u52a1"
                        }],
                        "selftZx": [],
                        "otherZx": []
                    },
                    {
                        "city": "\u676d\u5dde\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u676d\u5dde\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u6d4e\u5357\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u6d4e\u5357\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u6606\u5c71\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u82cf\u5dde\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u5357\u4eac\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u5357\u4eac\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u5357\u5b81\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u5357\u5b81\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u6cc9\u5dde\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u6cc9\u5dde\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u6df1\u5733\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u6df1\u5733\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u592a\u539f\u5e02",
                        "name": "\u827e\u4f9d\u683c\u8863\u67dc(\u592a\u539f\u5e97)",
                        "catagorys": [{"id": 1012, "parentId": 316, "catagoryName": "\u5bb6\u5c45\u5bb6\u5177"}, {
                            "id": 316,
                            "parentId": 0,
                            "catagoryName": "\u751f\u6d3b\u670d\u52a1"
                        }],
                        "selftZx": [],
                        "otherZx": []
                    },
                    {
                        "city": "\u6b66\u6c49\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u6b66\u6c49\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u897f\u5b89\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u897f\u5b89\u5e97)",
                        "catagorys": [{
                            "id": 540,
                            "parentId": 316,
                            "catagoryName": "\u5176\u4ed6\u751f\u6d3b\u670d\u52a1"
                        }, {"id": 316, "parentId": 0, "catagoryName": "\u751f\u6d3b\u670d\u52a1"}],
                        "selftZx": [{
                            "ucid": "20828884",
                            "ucname": "ayg11@y.com",
                            "sellerId": "60320",
                            "materials": [{
                                "id": "50099881",
                                "type": "11",
                                "deal_id": "14093531",
                                "online_status": "1"
                            }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                        }],
                        "otherZx": []
                    },
                    {
                        "city": "\u90d1\u5dde\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u90d1\u5dde\u5e97)",
                        "catagorys": [{"id": 1012, "parentId": 316, "catagoryName": "\u5bb6\u5c45\u5bb6\u5177"}, {
                            "id": 316,
                            "parentId": 0,
                            "catagoryName": "\u751f\u6d3b\u670d\u52a1"
                        }],
                        "selftZx": [],
                        "otherZx": []
                    },
                    {
                        "city": "\u91cd\u5e86\u5e02",
                        "name": "\u827e\u4f9d\u683c(\u91d1\u5f00\u5927\u9053\u5e97)",
                        "catagorys": [{"id": 1012, "parentId": 316, "catagoryName": "\u5bb6\u5c45\u5bb6\u5177"}, {
                            "id": 316,
                            "parentId": 0,
                            "catagoryName": "\u751f\u6d3b\u670d\u52a1"
                        }],
                        "selftZx": [],
                        "otherZx": []
                    }
                ],
                "count": 19
            },
            "sellerInfo": [{
                "sellerId": "60320",
                "sellerName": "\u827e\u4f9d\u683c\u8863\u67dc",
                "trade": null,
                "poiList": [{
                    "poi": "42869300",
                    "poiName": "\u827e\u4f9d\u683c(\u5317\u4eac\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "46856780",
                    "poiName": "\u827e\u4f9d\u683c(\u957f\u6625\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "46855997",
                    "poiName": "\u827e\u4f9d\u683c(\u957f\u6c99\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "44140118",
                    "poiName": "\u827e\u4f9d\u683c(\u5927\u8fde\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "43337207",
                    "poiName": "\u827e\u4f9d\u683c(\u4e1c\u839e\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "44174933",
                    "poiName": "\u827e\u4f9d\u683c(\u676d\u5dde\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "44123667",
                    "poiName": "\u827e\u4f9d\u683c(\u6d4e\u5357\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "42796836",
                    "poiName": "\u827e\u4f9d\u683c(\u82cf\u5dde\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "44123661",
                    "poiName": "\u827e\u4f9d\u683c(\u5357\u4eac\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "44179021",
                    "poiName": "\u827e\u4f9d\u683c(\u5357\u5b81\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "43361238",
                    "poiName": "\u827e\u4f9d\u683c(\u6cc9\u5dde\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "44191279",
                    "poiName": "\u827e\u4f9d\u683c(\u6df1\u5733\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "42742222",
                    "poiName": "\u827e\u4f9d\u683c(\u6b66\u6c49\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    }, {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }, {
                    "poi": "46854982",
                    "poiName": "\u827e\u4f9d\u683c(\u897f\u5b89\u5e97)",
                    "materials": [{
                        "id": "50099881",
                        "type": "11",
                        "deal_id": "14093531",
                        "online_status": "1"
                    },
                        {"id": "50099900", "type": "12", "deal_id": "14102724", "online_status": "1"}]
                }]
            }]
        }
    };
var dom = document.getElementById('obj-table');

var width = 50;
var unit = 'px';
function getHtml(data, count) {
    var count = count || 1;
    var result = {
        count: count,
        html: ''
    };
    var html = '';
    if (Array.isArray(data)) {
        result.html += '<div class="column" style="width:' + (width * result.count) + unit + ';">';

        data.forEach(function (item) {
            html += getHtml(item, result.count).html;
        });
        result.html += html;
        result.html += '</div>';
    }
    else if (typeof data === 'object') {

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                html += getHtml(data[key], result.count).html;
                count++;
            }
        }
        result.count += count;
        result.html += '<div class="row" style="width:' + (width * result.count) + unit + ';">';
        result.html += html;
        result.html += '</div>';
    }
    else {
        result.html += '<div class="row padding" style="width:' + width + unit + ';">';
        result.html += data.toString();
        result.html += '</div>';
    }
    return result;
}
var result = getHtml(simpleData[0].b);
// var result = getHtml(complexData.data.poiInfo.poiInfo);
dom.innerHTML = result.html;