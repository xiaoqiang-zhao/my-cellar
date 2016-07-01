/**
 * 是否循环
 *
 * Created by zhaoxiaoqiang on 16/6/20.
 */
var data = [
    {
        "resourceId": "sid-E312C067-DA9D-4CF2-A2B7-351047877601",
        "stencil": {
            "id": "start"
        },
        "outgoing": [{"resourceId": "sid-C1003504-F01A-4819-AA74-E5F264E8A679"}]
    },
    {
        "resourceId": "sid-6A757572-77FA-42DE-B149-7C0D12C0D570",
        "stencil": {
            "id": "bind"
        },
        "outgoing": [{"resourceId": "sid-C92FBDAE-C645-4495-843C-80DCBC843586"}]
    },
    {
        "resourceId": "sid-53A46794-2898-4EA6-91A4-0B75D7FC510D",
        "stencil": {"id": "end"},
        "outgoing": []
    }, {
        "resourceId": "sid-4B562807-7371-430E-B958-10C0AE7D008E",
        "stencil": {
            "id": "SequenceFlow"
        },
        "outgoing": [{"resourceId": "sid-DD371703-EF0D-4B5B-8331-DE07F7A83958"}]
    },
    {
        "resourceId": "sid-B9872F7B-7106-4589-BBD3-93432C2B2B38",
        "stencil": {"id": "for"},
        "outgoing": [{"resourceId": "sid-806D764A-B5E3-49C9-90EE-26CC47EFFA55"}]
    },
    {
        "resourceId": "sid-C92FBDAE-C645-4495-843C-80DCBC843586",
        "stencil": {"id": "SequenceFlow"},
        "outgoing": [
            {"resourceId": "sid-49F08EA3-22BF-4D10-ACC6-A2A4E29A4849"},
            {"resourceId": "sid-6A757572-77FA-42DE-B149-7C0D12C0D570"}
        ]
    },
    {
        "resourceId": "sid-49F08EA3-22BF-4D10-ACC6-A2A4E29A4849",
        "stencil": {"id": "dbOp"},
        "outgoing": [{"resourceId": "sid-4B562807-7371-430E-B958-10C0AE7D008E"}]
    },
    {
        "resourceId": "sid-DD371703-EF0D-4B5B-8331-DE07F7A83958",
        "stencil": {"id": "if"},
        "outgoing": [{"resourceId": "sid-A364B046-7C8A-471C-8126-F2E02EB0FCB5"}]
    }, {
        "resourceId": "sid-C1003504-F01A-4819-AA74-E5F264E8A679",
        "stencil": {"id": "SequenceFlow"},
        "outgoing": [{"resourceId": "sid-6A757572-77FA-42DE-B149-7C0D12C0D570"}]
    },
    {
        "resourceId": "sid-A364B046-7C8A-471C-8126-F2E02EB0FCB5",
        "stencil": {"id": "SequenceFlow"},
        "outgoing": [{"resourceId": "sid-3AB27DA5-6C41-4415-81FE-C492396442FC"}]
    },
    {
        "resourceId": "sid-806D764A-B5E3-49C9-90EE-26CC47EFFA55",
        "stencil": {"id": "SequenceFlow"},
        "outgoing": [{"resourceId": "sid-53A46794-2898-4EA6-91A4-0B75D7FC510D"}]
    },
    {
        "resourceId": "sid-3AB27DA5-6C41-4415-81FE-C492396442FC",
        "stencil": {"id": "serviceInvoke"},
        "outgoing": [{"resourceId": "sid-BE963A09-20FF-4AC2-B3D4-EC1E090023D9"}]
    },
    {
        "resourceId": "sid-BE963A09-20FF-4AC2-B3D4-EC1E090023D9",
        "stencil": {"id": "SequenceFlow"},
        "outgoing": [{"resourceId": "sid-B9872F7B-7106-4589-BBD3-93432C2B2B38"}]
    }
];