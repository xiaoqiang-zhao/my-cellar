/**
 * 是否循环
 *
 * Created by zhaoxiaoqiang on 16/6/20.
 */
var data = [{
    "resourceId": "sid-E312C067-DA9D-4CF2-A2B7-351047877601",
    "properties": {},
    "stencil": {"id": "start"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-C1003504-F01A-4819-AA74-E5F264E8A679"}],
    "bounds": {"lowerRight": {"x": 512.10624, "y": 137.10624}, "upperLeft": {"x": 480, "y": 105}},
    "dockers": []
}, {
    "resourceId": "sid-6A757572-77FA-42DE-B149-7C0D12C0D570",
    "properties": {"bindkey": "", "bindvalue": ""},
    "stencil": {
        "id": "bind"
    },
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-C92FBDAE-C645-4495-843C-80DCBC843586"}],
    "bounds": {"lowerRight": {"x": 345.94259999999997, "y": 66.73958}, "upperLeft": {"x": 314.7886, "y": 45}},
    "dockers": []
}, {
    "resourceId": "sid-53A46794-2898-4EA6-91A4-0B75D7FC510D",
    "properties": {},
    "stencil": {"id": "end"},
    "childShapes": [],
    "outgoing": [],
    "bounds": {"lowerRight": {"x": 345.7312, "y": 240.7312}, "upperLeft": {"x": 315, "y": 210}},
    "dockers": []
}, {
    "resourceId": "sid-4B562807-7371-430E-B958-10C0AE7D008E",
    "properties": {"name": "", "showdiamondmarker": false},
    "stencil": {"id": "SequenceFlow"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-DD371703-EF0D-4B5B-8331-DE07F7A83958"}],
    "bounds": {
        "lowerRight": {"x": 161.27271733783718, "y": 186.16037598357713},
        "upperLeft": {"x": 138.64643578716283, "y": 119.1337958914229}
    },
    "dockers": [{"x": 15.780429999999996, "y": 15.780450000000002}, {"x": 15.364075422286987, "y": 9.145280361175537}],
    "target": {"resourceId": "sid-DD371703-EF0D-4B5B-8331-DE07F7A83958"}
}, {
    "resourceId": "sid-B9872F7B-7106-4589-BBD3-93432C2B2B38",
    "properties": {"forarrayname": "", "localcompname": "", "foroutput": ""},
    "stencil": {"id": "for"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-806D764A-B5E3-49C9-90EE-26CC47EFFA55"}],
    "bounds": {"lowerRight": {"x": 363.68591, "y": 137.89607}, "upperLeft": {"x": 330, "y": 104.21017}},
    "dockers": []
}, {
    "resourceId": "sid-C92FBDAE-C645-4495-843C-80DCBC843586",
    "properties": {"name": "", "showdiamondmarker": false},
    "stencil": {"id": "SequenceFlow"},
    "childShapes": [],
    "outgoing": [
        {"resourceId": "sid-49F08EA3-22BF-4D10-ACC6-A2A4E29A4849"},
        {"resourceId": "sid-6A757572-77FA-42DE-B149-7C0D12C0D570"}
    ],
    "bounds": {
        "lowerRight": {"x": 313.97877461359457, "y": 101.59097863457566},
        "upperLeft": {"x": 179.59561210515545, "y": 60.83911542792434}
    },
    "dockers": [{"x": 15.576999999999998, "y": 10.869790000000002}, {"x": 15.780429999999996, "y": 15.780450000000002}],
    "target": {"resourceId": "sid-49F08EA3-22BF-4D10-ACC6-A2A4E29A4849"}
}, {
    "resourceId": "sid-49F08EA3-22BF-4D10-ACC6-A2A4E29A4849",
    "properties": {"dbobj": "", "dbop": "", "dbinput": "", "dboutput": ""},
    "stencil": {"id": "dbOp"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-4B562807-7371-430E-B958-10C0AE7D008E"}],
    "bounds": {"lowerRight": {"x": 181.56086, "y": 121.5609}, "upperLeft": {"x": 150, "y": 90}},
    "dockers": []
}, {
    "resourceId": "sid-DD371703-EF0D-4B5B-8331-DE07F7A83958",
    "properties": {"test": ""},
    "stencil": {"id": "if"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-A364B046-7C8A-471C-8126-F2E02EB0FCB5"}],
    "bounds": {
        "lowerRight": {"x": 151.364075422287, "y": 203.14528036117554},
        "upperLeft": {"x": 120.63592457771301, "y": 184.85471963882446}
    },
    "dockers": []
}, {
    "resourceId": "sid-C1003504-F01A-4819-AA74-E5F264E8A679",
    "properties": {"name": "", "showdiamondmarker": false},
    "stencil": {"id": "SequenceFlow"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-6A757572-77FA-42DE-B149-7C0D12C0D570"}],
    "bounds": {
        "lowerRight": {"x": 480.7934234540098, "y": 114.11024131939486},
        "upperLeft": {"x": 346.69072654599006, "y": 62.19031446185516}
    },
    "dockers": [{"x": 14.553119999999979, "y": 14.437520000000006}, {"x": 15.576999999999998, "y": 10.869790000000002}],
    "target": {"resourceId": "sid-6A757572-77FA-42DE-B149-7C0D12C0D570"}
}, {
    "resourceId": "sid-A364B046-7C8A-471C-8126-F2E02EB0FCB5",
    "properties": {"name": "", "showdiamondmarker": false},
    "stencil": {"id": "SequenceFlow"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-3AB27DA5-6C41-4415-81FE-C492396442FC"}],
    "bounds": {
        "lowerRight": {"x": 226.19588133742448, "y": 189.36418764508764},
        "upperLeft": {"x": 144.18801811570054, "y": 142.93377430803739}
    },
    "dockers": [{"x": 15.364075422286987, "y": 9.145280361175537}, {"x": 15.075530000000015, "y": 15.075530000000015}],
    "target": {"resourceId": "sid-3AB27DA5-6C41-4415-81FE-C492396442FC"}
}, {
    "resourceId": "sid-806D764A-B5E3-49C9-90EE-26CC47EFFA55",
    "properties": {"name": ""},
    "stencil": {"id": "SequenceFlow"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-53A46794-2898-4EA6-91A4-0B75D7FC510D"}],
    "bounds": {
        "lowerRight": {"x": 345.65709340541997, "y": 209.7089046947562},
        "upperLeft": {"x": 332.838754953955, "y": 128.56040280524383}
    },
    "dockers": [{"x": 16.842955, "y": 16.84295}, {"x": 15.3656, "y": 15.3656}],
    "target": {"resourceId": "sid-53A46794-2898-4EA6-91A4-0B75D7FC510D"}
}, {
    "resourceId": "sid-3AB27DA5-6C41-4415-81FE-C492396442FC",
    "properties": {"serviceinfo": "", "serviceinput": "", "serviceoutput": ""},
    "stencil": {"id": "serviceInvoke"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-BE963A09-20FF-4AC2-B3D4-EC1E090023D9"}],
    "bounds": {"lowerRight": {"x": 255.15106, "y": 150.15106}, "upperLeft": {"x": 225, "y": 120}},
    "dockers": []
}, {
    "resourceId": "sid-BE963A09-20FF-4AC2-B3D4-EC1E090023D9",
    "properties": {"name": ""},
    "stencil": {"id": "SequenceFlow"},
    "childShapes": [],
    "outgoing": [{"resourceId": "sid-B9872F7B-7106-4589-BBD3-93432C2B2B38"}],
    "bounds": {
        "lowerRight": {"x": 339.1785055192067, "y": 133.08296091075238},
        "upperLeft": {"x": 255.24706405110578, "y": 122.05973838612266}
    },
    "dockers": [{"x": 15.07553, "y": 15.075530000000004}, {"x": 16.84295499999999, "y": 16.842950000000002}],
    "target": {"resourceId": "sid-B9872F7B-7106-4589-BBD3-93432C2B2B38"}
}];