import * as XLSX from "xlsx";
import XLSXS from "xlsx-js-style";

const dataSource = ref([]);
let columns: BasicColumn[] = [
  {
    title: "当月达成情况",
    dataIndex: "current_month",
    children: [
      {
        title: "大区",
        dataIndex: "regionName",
        width: 120,
      },
      {
        title: "大区达成率",
        width: 120,
        dataIndex: "regionRate",
      },
      {
        title: "省",
        width: 120,
        dataIndex: "province",
      },
      {
        title: "当月任务(万)",
        width: 140,
        dataIndex: "monthlySales",
        customCell: (_, index) => ({
          // rowSpan: index === 0 ? 2 : 1,
          // colSpan: index === 1 ? 0 : 1,
        }),
      },
    ],
  },
  {
    title: "人员情况",
    dataIndex: "personnel_situation",
    children: [
      {
        title: "省区负责人",
        width: 120,
        dataIndex: "provincePrincipal",
      },
      {
        title: "地区经理人数",
        width: 120,
        dataIndex: "managerNumber",
      },
    ],
  },
  {
    title: "有效开户情况",
    dataIndex: "effective_account",
    children: [
      {
        title: "开户数-连锁",
        width: 150,
        dataIndex: "openAccountsMulti",
      },
      {
        title: "开户数-单体",
        width: 150,
        dataIndex: "openAccountsSingle",
      },
      {
        title: "平均每人开发数(15为达标)",
        width: 200,
        dataIndex: "openAccountsAvg",
      },
    ],
  },
  {
    title: "上月业绩情况",
    dataIndex: "last_month",
    children: [
      {
        title: "控销订单数(个)",
        width: 150,
        dataIndex: "lastMonthOrderNumber",
      },
      {
        title: "控销业绩额(元)",
        width: 150,
        dataIndex: "lastMonthPerformanceAmt",
      },
    ],
  },
  {
    title: "当月业绩情况",
    dataIndex: "current_month_amount",
    children: [
      {
        title: "控销订单数(个)",
        width: 150,
        dataIndex: "orderNumber",
      },
      {
        title: "控销业绩额(元)",
        width: 150,
        dataIndex: "perAmt",
      },
      {
        title: "控销任务数(元)",
        width: 150,
        dataIndex: "taskSaleNumber",
      },
      {
        title: "丸剂任务数量(元)",
        width: 160,
        dataIndex: "pillTaskQuantity",
      },
      {
        title: "丸剂完成数量(宝龙丸核算*2)",
        width: 210,
        dataIndex: "pillTaskCompletedQuantity",
      },
      {
        title: "丸剂完成率",
        width: 150,
        dataIndex: "pillCompletionRate",
      },
      {
        title: "慢病&家里有矿任务数",
        width: 180,
        dataIndex: "twoTaskQuantity",
      },
      {
        title: "慢病考核",
        dataIndex: "chronic_disease_examine",
        children: [
          {
            title: "硫酸氢氯吡格雷销量",
            dataIndex: "optionSaleNumber1",
            width: 160,
          },
          {
            title: "苯磺酸左氨氯地平片销量",
            dataIndex: "optionSaleNumber2",
            width: 190,
          },
          {
            title: "完成率",
            dataIndex: "optionCompleteRate1",
            width: 120,
          },
        ],
      },
      {
        title: "家里有矿考核",
        dataIndex: "jlyk_examine",
        children: [
          {
            title: "维生素C咀嚼片",
            dataIndex: "optionSaleNumber3",
            width: 120,
          },
          {
            title: "阿仑膦酸钠维D3",
            dataIndex: "optionSaleNumber4",
            width: 150,
          },
          {
            title: "完成率",
            dataIndex: "optionCompleteRate2",
            width: 120,
          },
        ],
      },
      {
        title: "连锁多体占比",
        dataIndex: "chRate",
        width: 150,
      },
      {
        title: "单体占比",
        dataIndex: "smpRate",
        width: 150,
      },
      {
        title: "7.1-7.8日（第一周）",
        children: [
          {
            title: "总额",
            dataIndex: "controlPerAmt1",
            width: 150,
            customRender: ({ record }) => {
              return record.controlPerAmt1 === 0 ? "-" : record.controlPerAmt1;
            },
          },
          {
            title: "连锁（多体）占比",
            dataIndex: "chAmtRate1",
            width: 150,
            customRender: ({ record }) => {
              return record.chAmtRate1 === "0%" ? "-" : record.chAmtRate1;
            },
          },
          {
            title: "单体占比",
            dataIndex: "smpAmtRate1",
            width: 150,
            customRender: ({ record }) => {
              return record.smpAmtRate1 === "0%" ? "-" : record.smpAmtRate1;
            },
          },
        ],
      },
      {
        title: "7.9-7.15日（第二周）",
        children: [
          {
            title: "总额",
            dataIndex: "controlPerAmt2",
            width: 150,
            customRender: ({ record }) => {
              return record.controlPerAmt2 === 0 ? "-" : record.controlPerAmt2;
            },
          },
          {
            title: "连锁（多体）占比",
            dataIndex: "chAmtRate2",
            width: 150,
            customRender: ({ record }) => {
              return record.chAmtRate2 === "0%" ? "-" : record.chAmtRate2;
            },
          },
          {
            title: "单体占比",
            dataIndex: "smpAmtRate2",
            width: 150,
            customRender: ({ record }) => {
              return record.smpAmtRate2 === "0%" ? "-" : record.smpAmtRate2;
            },
          },
        ],
      },
      {
        title: "7.16-7.22日（第三周）",
        children: [
          {
            title: "总额",
            dataIndex: "controlPerAmt3",
            width: 150,
            customRender: ({ record }) => {
              return record.controlPerAmt3 === 0 ? "-" : record.controlPerAmt3;
            },
          },
          {
            title: "连锁（多体）占比",
            dataIndex: "chAmtRate3",
            width: 150,
            customRender: ({ record }) => {
              return record.chAmtRate3 === "0%" ? "-" : record.chAmtRate3;
            },
          },
          {
            title: "单体占比",
            dataIndex: "smpAmtRate3",
            width: 150,
            customRender: ({ record }) => {
              return record.smpAmtRate3 === "0%" ? "-" : record.smpAmtRate3;
            },
          },
        ],
      },
      {
        title: "7.23-7.31日（第四周）",
        children: [
          {
            title: "总额",
            dataIndex: "controlPerAmt4",
            width: 150,
            customRender: ({ record }) => {
              return record.controlPerAmt4 === 0 ? "-" : record.controlPerAmt4;
            },
          },
          {
            title: "连锁（多体）占比",
            dataIndex: "chAmtRate4",
            width: 150,
            customRender: ({ record }) => {
              return record.chAmtRate4 === "0%" ? "-" : record.chAmtRate4;
            },
          },
          {
            title: "单体占比",
            dataIndex: "smpAmtRate4",
            width: 150,
            customRender: ({ record }) => {
              return record.smpAmtRate4 === "0%" ? "-" : record.smpAmtRate4;
            },
          },
        ],
      },
      {
        title: "（第五周）",
        children: [
          {
            title: "总额",
            dataIndex: "controlPerAmt5",
            width: 150,
            customRender: ({ record }) => {
              return record.controlPerAmt5 === 0 ? "-" : record.controlPerAmt5;
            },
          },
          {
            title: "连锁（多体）占比",
            dataIndex: "chAmtRate5",
            width: 150,
            customRender: ({ record }) => {
              return record.chAmtRate5 === "0%" ? "-" : record.chAmtRate5;
            },
          },
          {
            title: "单体占比",
            dataIndex: "smpAmtRate5",
            width: 150,
            customRender: ({ record }) => {
              return record.smpAmtRate5 === "0%" ? "-" : record.smpAmtRate5;
            },
          },
        ],
      },
      {
        title: "第一周规划业绩（元）",
        dataIndex: "weekTgtAmt1",
        width: 180,
        customRender: ({ record }) => {
          return record.weekTgtAmt1 === 0 ? "-" : record.weekTgtAmt1;
        },
      },
      {
        title: "第一周达成率",
        dataIndex: "weekTgtRate1",
        width: 150,
        customRender: ({ record }) => {
          return record.weekTgtRate1 === "0%" ? "-" : record.weekTgtRate1;
        },
      },
      {
        title: "第二周规划业绩（元）",
        dataIndex: "weekTgtAmt2",
        width: 180,
        customRender: ({ record }) => {
          return record.weekTgtAmt2 === 0 ? "-" : record.weekTgtAmt2;
        },
      },
      {
        title: "第二周达成率",
        dataIndex: "weekTgtRate2",
        width: 150,
        customRender: ({ record }) => {
          return record.weekTgtRate2 === "0%" ? "-" : record.weekTgtRate2;
        },
      },
      {
        title: "第三周规划业绩（元）",
        dataIndex: "weekTgtAmt3",
        width: 180,
        customRender: ({ record }) => {
          return record.weekTgtAmt3 === 0 ? "-" : record.weekTgtAmt3;
        },
      },
      {
        title: "第三周达成率",
        dataIndex: "weekTgtRate3",
        width: 150,
        customRender: ({ record }) => {
          return record.weekTgtRate3 === "0%" ? "-" : record.weekTgtRate3;
        },
      },
      {
        title: "第四周规划业绩（元）",
        dataIndex: "weekTgtAmt4",
        width: 180,
        customRender: ({ record }) => {
          return record.weekTgtAmt4 === 0 ? "-" : record.weekTgtAmt4;
        },
      },
      {
        title: "第四周达成率",
        dataIndex: "weekTgtRate4",
        width: 150,
        customRender: ({ record }) => {
          return record.weekTgtRate4 === "0%" ? "-" : record.weekTgtRate4;
        },
      },
      {
        title: "第五周规划业绩（元）",
        dataIndex: "weekTgtAmt5",
        width: 180,
        customRender: ({ record }) => {
          return record.weekTgtAmt5 === 0 ? "-" : record.weekTgtAmt5;
        },
      },
      {
        title: "第五周达成率",
        dataIndex: "weekTgtRate5",
        width: 150,
        customRender: ({ record }) => {
          return record.weekTgtRate5 === "0%" ? "-" : record.weekTgtRate5;
        },
      },
      {
        title: "当月任务达成率",
        dataIndex: "taskCompleteRate",
        width: 150,
      },
    ],
  },
  {
    title: "上月业绩情况（1-22日）",
    dataIndex: "last_month_order",
    children: [
      {
        title: "控销订单数",
        dataIndex: "dateLastMonthOrderNumber",
        width: 150,
      },
      {
        title: "控销业绩数",
        dataIndex: "dateLastMonthPerformanceAmt",
        width: 150,
      },
    ],
  },
  {
    title: "同阶段环比",
    dataIndex: "same_hb",
    children: [
      {
        title: "订单环比",
        dataIndex: "orderRate",
        width: 150,
      },
      {
        title: "业绩环比",
        dataIndex: "perRate",
        width: 150,
      },
    ],
  },
];

function getRowSpan1(index) {
  const arr = dataSource.value.map((item) => item.regionId);
  let nanFangNum;
  let beiFangNum;
  let xiNanNum;
  let huaBeiNum;
  let zheJiangNum;
  let xiaoShouNum;
  let shangHaiNum;
  let xiangGangNum;
  if (isTestMode() || isDevMode()) {
    nanFangNum = arr.filter((item) => item === "10130104").length; // 南方大区数量
    beiFangNum = arr.filter((item) => item === "10130103").length; // 北方大区数量
    xiNanNum = arr.filter((item) => item === "10130102").length; // 西南大区数量
    huaBeiNum = arr.filter((item) => item === "10130101").length; // 华北大区数量
    zheJiangNum = arr.filter((item) => item === "10130105").length; // 浙江省数量
    shangHaiNum = arr.filter((item) => item === "10130100").length; // 上海市数量
  } else {
    nanFangNum = arr.filter((item) => item === "10130039").length; // 南方大区数量
    beiFangNum = arr.filter((item) => item === "10130038").length; // 北方大区数量
    xiNanNum = arr.filter((item) => item === "10130037").length; // 西南大区数量
    huaBeiNum = arr.filter((item) => item === "10130030").length; // 华北大区数量
    zheJiangNum = arr.filter((item) => item === "10130021").length; // 浙江省数量
    shangHaiNum = arr.filter((item) => item === "10130100").length; // 上海市数量
  }
  xiaoShouNum = arr.filter((item) => item === "1013").length; // 销售部数量
  xiangGangNum = arr.filter((item) => item === "10130040").length; // 香港数量

  const regionNameMap =
    isTestMode() || isDevMode()
      ? {
          1013: xiaoShouNum,
          10130100: shangHaiNum,
          10130101: huaBeiNum,
          10130102: xiNanNum,
          10130103: beiFangNum,
          10130104: nanFangNum,
          10130105: zheJiangNum,
        }
      : {
          1013: xiaoShouNum,
          10130022: shangHaiNum,
          10130030: huaBeiNum,
          10130037: xiNanNum,
          10130038: beiFangNum,
          10130039: nanFangNum,
          10130021: zheJiangNum,
          10130040: xiangGangNum,
        };

  // 大区regionId排序后的顺序
  const uniqueArr = [...new Set(arr)];

  // 删除最后合计的那一项regionId为null
  uniqueArr.pop();

  const numMapArr: any[] = [];

  for (let i = 0; i < uniqueArr.length; i++) {
    const regionId = uniqueArr[i];
    const obj = {
      label: regionLabelMap[regionId],
      regionId,
      count: regionNameMap[regionId],
    };
    if (obj.count > 0) {
      numMapArr.push(obj);
    }
  }

  console.log(numMapArr);

  const length = numMapArr.length;

  if (length === 0) {
    return 1;
  }

  if (length >= 1 && index === 0) {
    return numMapArr[0].count;
  } else if (length >= 1 && index > 0 && index <= numMapArr[0].count - 1) {
    return 0;
  } else if (length >= 2 && index === numMapArr[0].count) {
    return numMapArr[1].count;
  } else if (
    length >= 2 &&
    index > numMapArr[0].count &&
    index <= numMapArr[0].count + numMapArr[1].count - 1
  ) {
    return 0;
  } else if (length >= 3 && index === numMapArr[0].count + numMapArr[1].count) {
    return numMapArr[2].count;
  } else if (
    length >= 3 &&
    index > numMapArr[0].count + numMapArr[1].count &&
    index <= numMapArr[0].count + numMapArr[1].count + numMapArr[2].count - 1
  ) {
    return 0;
  } else if (
    length >= 4 &&
    index === numMapArr[0].count + numMapArr[1].count + numMapArr[2].count
  ) {
    return numMapArr[3].count;
  } else if (
    length >= 4 &&
    index > numMapArr[0].count + numMapArr[1].count + numMapArr[2].count &&
    index <=
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count -
        1
  ) {
    return 0;
  } else if (
    length >= 5 &&
    index ===
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count
  ) {
    return numMapArr[4].count;
  } else if (
    length >= 5 &&
    index >
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count &&
    index <=
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count -
        1
  ) {
    return 0;
  } else if (
    length >= 6 &&
    index ===
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count
  ) {
    return numMapArr[5].count;
  } else if (
    length >= 6 &&
    index >
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count &&
    index <=
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count +
        numMapArr[5].count -
        1
  ) {
    return 0;
  } else if (
    length >= 7 &&
    index ===
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count +
        numMapArr[5].count
  ) {
    return numMapArr[6].count;
  } else if (
    length >= 7 &&
    index >
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count +
        numMapArr[5].count &&
    index <=
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count +
        numMapArr[5].count +
        numMapArr[6].count -
        1
  ) {
    return 0;
  } else if (
    length >= 8 &&
    index ===
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count +
        numMapArr[5].count +
        numMapArr[6].count
  ) {
    return numMapArr[7].count;
  } else if (
    length >= 8 &&
    index >
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count +
        numMapArr[5].count +
        numMapArr[6].count &&
    index <=
      numMapArr[0].count +
        numMapArr[1].count +
        numMapArr[2].count +
        numMapArr[3].count +
        numMapArr[4].count +
        numMapArr[5].count +
        numMapArr[6].count +
        numMapArr[7].count -
        1
  ) {
    return 0;
  }
}

function pushRowSpanPlaceHolder(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push("!$ROW_SPAN_PLACEHOLDER");
  }
}

function pushColSpanPlaceHolder(arr, count) {
  for (let i = 0; i < count; i++) {
    arr.push("!$COL_SPAN_PLACEHOLDER");
  }
}

function getHeader(headers, excelHeader, deep, perOffset) {
  let offset = 0;
  let cur = excelHeader[deep];
  if (!cur) {
    cur = excelHeader[deep] = [];
  }
  // 填充行合并占位符
  pushRowSpanPlaceHolder(cur, perOffset - cur.length);
  for (let i = 0; i < headers.length; i++) {
    let head = headers[i];
    cur.push(head.name);
    if (
      head.hasOwnProperty("child") &&
      Array.isArray(head.child) &&
      head.child.length > 0
    ) {
      let childOffset = getHeader(
        head.child,
        excelHeader,
        deep + 1,
        cur.length - 1
      );
      // 填充列合并占位符
      pushColSpanPlaceHolder(cur, childOffset - 1);
      offset += childOffset;
    } else {
      offset++;
    }
  }
  return offset;
}

function buildHeader(revealList) {
  let excelHeader = [];
  // 构建生成excel表头需要的数据结构
  getHeader(revealList, excelHeader, 0, 0);
  // 多行表头长短不一，短的向长的看齐，不够的补上行合并占位符
  let max = Math.max(...excelHeader.map((a) => a.length));
  excelHeader
    .filter((e) => e.length < max)
    .forEach((e) => pushRowSpanPlaceHolder(e, max - e.length));
  return excelHeader;
}

// 扁平头部
function flat(revealList) {
  let result = [];
  revealList.forEach((e) => {
    if (e.hasOwnProperty("child")) {
      result.push(...flat(e.child));
    } else if (e.hasOwnProperty("exeFun")) {
      result.push(e);
    } else if (e.hasOwnProperty("prop")) {
      result.push(e);
    }
  });
  return result;
}

function flatData(list, eachDataCallBack) {
  let resultList = [];
  for (let i = 0; i < list.length; i++) {
    let data = list[i];
    let rawDataList = [];
    // 每个子元素都父元素合并成一条数据
    if (data.child && data.child.length > 0) {
      for (let j = 0; j < data.child.length; j++) {
        delete data.child[j].bsm;
        let copy = Object.assign({}, data, data.child[j]);
        rawDataList.push(copy);
        copy["rowSpan"] = j > 0 ? 0 : data.child.length;
      }
    } else {
      data["rowSpan"] = 1;
      rawDataList.push(data);
    }
    resultList.push(...rawDataList);
    if (typeof eachDataCallBack === "function") {
      eachDataCallBack(rawDataList);
    }
  }
  return resultList;
}

function extractData(selectionData, revealList) {
  // 列
  let headerList = flat(revealList);
  // 导出的结果集
  let excelRows = [];
  // 如果有child集合的话会用到
  let dataKeys = new Set(Object.keys(selectionData[0]));
  selectionData.some((e) => {
    if (e.child && e.child.length > 0) {
      let childKeys = Object.keys(e.child[0]);
      for (let i = 0; i < childKeys.length; i++) {
        dataKeys.delete(childKeys[i]);
      }
      return true;
    }
  });
  flatData(selectionData, (list) => {
    excelRows.push(...buildExcelRow(dataKeys, headerList, list));
  });
  return excelRows;
}

function buildExcelRow(mainKeys, headers, rawDataList) {
  // 合计行
  let sumCols = [];
  // 数据行
  let rows = [];
  for (let i = 0; i < rawDataList.length; i++) {
    let cols = [];
    let rawData = rawDataList[i];
    // 提取数据
    for (let j = 0; j < headers.length; j++) {
      let header = headers[j];
      // 父元素键需要行合并
      if (rawData["rowSpan"] === 0 && mainKeys.has(header.prop)) {
        cols.push("!$ROW_SPAN_PLACEHOLDER");
      } else {
        let value;
        if (typeof header.exeFun === "function") {
          value = header.exeFun(rawData);
        } else {
          value = rawData[header.prop];
        }
        cols.push(value);
        // 如果该列需要合计,并且是数字类型
        if (header["summable"] && typeof value === "number") {
          sumCols[j] = (sumCols[j] ? sumCols[j] : 0) + value;
        }
      }
    }
    rows.push(cols);
  }
  // 如果有合计行
  if (sumCols.length > 0) {
    rows.push(...sumRowHandle(sumCols));
  }
  return rows;
}

function sumRowHandle(sumCols) {
  //TODO
  return [];
}

function transformColumns(columns) {
  let header: any[] = [];
  for (let i = 0; i < columns.length; i++) {
    const cur = columns[i];
    if (!cur.children) {
      header.push({
        name: cur.title,
        prop: cur.dataIndex,
      });
    } else {
      cur.name = cur.title;
      cur.prop = cur.dataIndex;
      cur.child = transformColumns(cur.children);
      delete cur.children;
      delete cur.dataIndex;
      header.push(cur);
    }
  }
  return header;
}

function handleExport() {
  const header = transformColumns(columns);
  let sheetName = "销售部月报";
  // excel表头
  let excelHeader = buildHeader(header);
  // 头部行数，用来固定表头
  let headerRows = excelHeader.length;
  // 提取数据
  let dataList = extractData(dataSource.value, header);
  excelHeader.push(...dataList, []);
  // 计算合并
  let merges = doMerges(excelHeader);
  // 生成sheet
  let ws = aoa_to_sheet(excelHeader, headerRows);
  const arrMap = dataSource.value.map(item => ({
    name: item.regionName,
    id: item.regionId,
    count: dataSource.value.filter(v => v.regionId === item.regionId).length
  }));

  // 删除最后合计的那一项regionId为null
  arrMap.pop();

  const numMapArr = unique(arrMap, 'id');

  const length = numMapArr.length;

  if (length >= 1) {
    merges.push(
      {
        s: {
          c: 0,
          r: 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + 2,
        }
      },
    );
  }

  if (length >= 2) {
    merges.push(
      {
        s: {
          c: 0,
          r: numMapArr[0].count + 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: numMapArr[0].count + 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + 2,
        }
      },
    )
  }

  if (length >= 3) {
    merges.push(
      {
        s: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + 2,
        }
      },
    )
  }

  if (length >= 4) {
    merges.push(
      {
        s: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + 2,
        }
      },
    )
  }

  if (length >= 5) {
    merges.push(
      {
        s: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + 2,
        }
      },
    )
  }

  if (length >= 6) {
    merges.push(
      {
        s: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + 2,
        }
      },
    )
  }

  if (length >= 7) {
    merges.push(
      {
        s: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + numMapArr[6].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + numMapArr[6].count + 2,
        }
      },
    )
  }

  if (length >= 8) {
    merges.push(
      {
        s: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + numMapArr[6].count + 3,
        },
        e: {
          c: 0,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + numMapArr[6].count + numMapArr[7].count + 2,
        }
      },
      {
        s: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + numMapArr[6].count + 3,
        },
        e: {
          c: 1,
          r: numMapArr[0].count + numMapArr[1].count + numMapArr[2].count + numMapArr[3].count + numMapArr[4].count + numMapArr[5].count + numMapArr[6].count + numMapArr[7].count + 2,
        }
      },
    )
  }

  merges.push(
    {
      s: {
        c: 0,
        r: dataSource.value.length + 2,
      },
      e: {
        c: 2,
        r: dataSource.value.length + 2,
      }
    },
  )

  // 单元格合并
  ws["!merges"] = merges;
  // 头部冻结
  ws["!freeze"] = {
    xSplit: "1",
    ySplit: "" + headerRows,
    topLeftCell: "B" + (headerRows + 1),
    activePane: "bottomRight",
    state: "frozen",
  };
  // 列宽
  ws["!cols"] = [];
  for (let i = 0; i < 50; i++) {
    ws["!cols"].push({ wpx: 150 });
  }
  let workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = ws;
  // excel样式
  let wopts = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
    cellStyles: true,
  };
  let wbout = XLSXS.write(workbook, wopts);
  let blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  openDownloadXLSXDialog(blob, sheetName + ".xlsx");
}

function openDownloadXLSXDialog(url, saveName) {
  if (typeof url == "object" && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) {
    event = new MouseEvent("click");
  } else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
}

function s2ab(s) {
  let buf = new ArrayBuffer(s.length);
  let view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

function getV(data, C) {
  if (data === 0) {
    if (C >= 26 && C <= 50) {
      return "-";
    } else {
      return 0;
    }
  }
  if (data === "0%" && C >= 26 && C <= 50) return "-";
  if (!data) return "";
  return data;
}

function aoa_to_sheet(data, headerRows) {
  const ws = {};
  const range = { s: { c: 10000000, r: 10000000 }, e: { c: 0, r: 0 } };
  // 遍历步骤1里面的二维数组数据
  for (let R = 0; R !== data.length; ++R) {
    for (let C = 0; C !== data[R].length; ++C) {
      if (range.s.r > R) {
        range.s.r = R;
      }
      if (range.s.c > C) {
        range.s.c = C;
      }
      if (range.e.r < R) {
        range.e.r = R;
      }
      if (range.e.c < C) {
        range.e.c = C;
      }
      /// 构造cell对象，对所有excel单元格使用如下样式
      const cell = {
        // v: data[R][C] || '',
        v: getV(data[R][C], C),
        s: {
          font: { name: "宋体", sz: 11, color: { auto: 1 } },
          // 单元格对齐方式
          alignment: {
            /// 自动换行
            wrapText: 1,
            // 水平居中
            horizontal: "center",
            // 垂直居中
            vertical: "center",
          },
        },
      };
      // 头部列表加边框
      if (R < headerRows) {
        cell.s.border = {
          top: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        };
        // 给个背景色
        cell.s.fill = {
          patternType: "solid",
          fgColor: { theme: 3, tint: 0.3999755851924192, rgb: "DDD9C4" },
          bgColor: { theme: 7, tint: 0.3999755851924192, rgb: "8064A2" },
        };
      }
      const cell_ref = XLSX.utils.encode_cell({ c: C, r: R });
      // 该单元格的数据类型，只判断了数值类型、布尔类型，字符串类型，省略了其他类型
      // 自己可以翻文档加其他类型
      if (typeof cell.v === "number") {
        cell.t = "n";
      } else if (typeof cell.v === "boolean") {
        cell.t = "b";
      } else {
        cell.t = "s";
      }
      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) {
    ws["!ref"] = XLSX.utils.encode_range(range);
  }
  return ws;
}

function doMerges(arr) {
  // 要么横向合并 要么纵向合并
  let deep = arr.length;
  let merges = [];
  for (let y = 0; y < deep; y++) {
    // 先处理横向合并
    let row = arr[y];
    let colSpan = 0;
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "!$COL_SPAN_PLACEHOLDER") {
        row[x] = undefined;
        if (x + 1 === row.length) {
          merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x } });
        }
        colSpan++;
      } else if (colSpan > 0 && x > colSpan) {
        merges.push({ s: { r: y, c: x - colSpan - 1 }, e: { r: y, c: x - 1 } });
        colSpan = 0;
      } else {
        colSpan = 0;
      }
    }
  }
  // 再处理纵向合并
  let colLength = arr[0].length;
  for (let x = 0; x < colLength; x++) {
    let rowSpan = 0;
    for (let y = 0; y < deep; y++) {
      if (arr[y][x] === "!$ROW_SPAN_PLACEHOLDER") {
        arr[y][x] = undefined;
        rowSpan++;
        if (y + 1 === deep) {
          merges.push({ s: { r: y - rowSpan, c: x }, e: { r: y, c: x } });
        }
      } else if (rowSpan > 0 && y > rowSpan) {
        merges.push({ s: { r: y - rowSpan - 1, c: x }, e: { r: y - 1, c: x } });
        rowSpan = 0;
      } else {
        rowSpan = 0;
      }
    }
  }

  return merges;
}
