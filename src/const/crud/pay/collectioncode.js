export const tableOption = {
  "border": true,
  "index": true,
  "indexLabel": "序号",
  "stripe": true,
  "menuAlign": "center",
  "align": "center",
  "searchMenuSpan": 6,
  "column": [
    {
      "type": "input",
      "label": "金额(元)",
      "prop": "amount",
      width: 120
    },	  {
      "type": "input",
      "label": "备注",
      "prop": "remark",
      width: 120
    },	  {
      "type": "input",
      "label": "支付短链接",
      "prop": "wechatUrl"
    },	  {
      "label": "使用状态",
      "prop": "status",
      'type': 'select',
      'search': true,
      'dicUrl': '/admin/dict/type/collectioncode_status',
      width: 120
    }
  ]
}
