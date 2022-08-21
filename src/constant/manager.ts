export const menuMap = [
  {
    label: "编辑机构",
    value: "edit_org",
    icon: "icon-bianji",
  },
  {
    label: "删除机构",
    value: "delete_org",
    icon: "icon-shanchu",
  },
  {
    label: "编辑部门",
    value: "edit_dep",
    icon: "icon-bianji",
  },

  {
    label: "删除部门",
    value: "delete_dep",
    icon: "icon-shanchu",
  },
  {
    label: "增加同级部门",
    value: "create_dep",
    icon: "icon-zengjiatongjibumen",
  },
  {
    label: "增加下级部门",
    value: "create_dep_sub",
    icon: "icon-zengjiaxiajibumen",
  },
  {
    label: "编辑岗位",
    value: "edit_post",
    icon: "icon-bianji",
  },
  {
    label: "删除岗位",
    value: "delete_post",
    icon: "icon-shanchu",
  },
  {
    label: "增加同级岗位",
    value: "create_post",
    icon: "icon-zengjiatongjigangwei",
  },
  {
    label: "增加下级岗位",
    value: "create_post_sub",
    icon: "icon-zengjiaxiajigangwei",
  },
];

export const MENUS = [
  {
    "id": "1527504739124940802",
    "parentId": "0",
    "name": "设置中心",
    "url": "setting",
    "type": "MENU",
    "operationKey": null,
    "menus": [
      {
        "id": "1527504740152545281",
        "parentId": "1527504739124940802",
        "name": "股票管理",
        "url": "stockManager",
        "type": "MENU",
        "operationKey": null,
        "menus": [
          {
            "id": "1527504740903325698",
            "parentId": "1527504740152545281",
            "name": "股票池类别设置",
            "url": "poolCategoriesSetting",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          },
          {
            "id": "1527504749770084353",
            "parentId": "1527504740152545281",
            "name": "股票池设置",
            "url": "poolSetting",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          },
          {
            "id": "1527504759421177857",
            "parentId": "1527504740152545281",
            "name": "股票池优先级设置",
            "url": "poolPrioritySetting",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          }
        ]
      },
      {
        "id": "1536186849339658241",
        "parentId": "1527504739124940802",
        "name": "研报管理",
        "url": "reportManagement",
        "type": "MENU",
        "operationKey": null,
        "menus": [
          {
            "id": "1536186850207879169",
            "parentId": "1536186849339658241",
            "name": "内部研报类型设置",
            "url": "inReportTypeSet",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          }
        ]
      },
      {
        "id": "1543838984919441410",
        "parentId": "1527504739124940802",
        "name": "组合管理",
        "url": "combinationManagement",
        "type": "MENU",
        "operationKey": null,
        "menus": [
          {
            "id": "1543838985737330690",
            "parentId": "1543838984919441410",
            "name": "组合类型设置",
            "url": "combinationTypeSetting",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          },
          {
            "id": "1543838992318193665",
            "parentId": "1543838984919441410",
            "name": "组合权限设置",
            "url": "combinationPermissionSetting",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          }
        ]
      }
    ]
  },
  {
    "id": "1524225341704306690",
    "parentId": "0",
    "name": "系统",
    "url": "sys",
    "type": "MENU",
    "operationKey": null,
    "menus": [
      {
        "id": "1524225343193284610",
        "parentId": "1524225341704306690",
        "name": "权限管理",
        "url": "permissionManager",
        "type": "MENU",
        "operationKey": null,
        "menus": [
          {
            "id": "1524225343369445377",
            "parentId": "1524225343193284610",
            "name": "用户管理",
            "url": "userManager",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          },
          {
            "id": "1524225350495567874",
            "parentId": "1524225343193284610",
            "name": "角色管理",
            "url": "roleManager",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          }
        ]
      }
    ]
  },
  {
    "id": "1527504762290081793",
    "parentId": "0",
    "name": "股票中心",
    "url": "stockCenter",
    "type": "MENU",
    "operationKey": null,
    "menus": [
      {
        "id": "1527504763204440066",
        "parentId": "1527504762290081793",
        "name": "股票池",
        "url": "stockPool",
        "type": "MENU",
        "operationKey": null,
        "menus": [
          {
            "id": "1527504764039106561",
            "parentId": "1527504763204440066",
            "name": "股票池管理",
            "url": "poolManage",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          },
          {
            "id": "1527504764810858498",
            "parentId": "1527504763204440066",
            "name": "股票池调整历史",
            "url": "poolHistory",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          }
        ]
      }
    ]
  },
  {
    "id": "1536186858315468802",
    "parentId": "0",
    "name": "研报中心",
    "url": "reportCenter",
    "type": "MENU",
    "operationKey": null,
    "menus": [
      {
        "id": "1536186859267575810",
        "parentId": "1536186858315468802",
        "name": "研报管理",
        "url": "reportManager",
        "type": "MENU",
        "operationKey": null,
        "menus": [
          {
            "id": "1536186860047716354",
            "parentId": "1536186859267575810",
            "name": "研报搜索",
            "url": "reportSearch",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          },
          {
            "id": "1536186860685250561",
            "parentId": "1536186859267575810",
            "name": "我的历史研报",
            "url": "reportHistory",
            "type": "MENU",
            "operationKey": null,
            "menus": [
              {
                "id": "1536186861708660738",
                "parentId": "1536186860685250561",
                "name": "上传研报",
                "url": "",
                "type": "OPERATION",
                "operationKey": "report:upload:create",
                "menus": []
              }
            ]
          },
          {
            "id": "1536186863621263361",
            "parentId": "1536186859267575810",
            "name": "研报上传",
            "url": "reportUpload",
            "type": "MENU",
            "operationKey": null,
            "menus": []
          }
        ]
      }
    ]
  },
  {
    "id": "1543839000593555458",
    "parentId": "0",
    "name": "模拟组合",
    "url": "combination",
    "type": "MENU",
    "operationKey": null,
    "menus": [
      {
        "id": "1543839001289809921",
        "parentId": "1543839000593555458",
        "name": "组合管理",
        "url": "combinationManager",
        "type": "MENU",
        "operationKey": null,
        "menus": []
      },
      {
        "id": "1543839001956704258",
        "parentId": "1543839000593555458",
        "name": "模拟组合列表",
        "url": "combinationList",
        "type": "MENU",
        "operationKey": null,
        "menus": [
          {
            "id": "1543839002883645441",
            "parentId": "1543839001956704258",
            "name": "组合调仓导出",
            "url": "",
            "type": "OPERATION",
            "operationKey": "combination:position:export",
            "menus": []
          },
          {
            "id": "1543839004766887937",
            "parentId": "1543839001956704258",
            "name": "新增组合",
            "url": "",
            "type": "OPERATION",
            "operationKey": "combination:create",
            "menus": []
          }
        ]
      },
      {
        "id": "1543839006360723458",
        "parentId": "1543839000593555458",
        "name": "组合标的汇总",
        "url": "subjectMatter",
        "type": "MENU",
        "operationKey": null,
        "menus": []
      }
    ]
  }
]
