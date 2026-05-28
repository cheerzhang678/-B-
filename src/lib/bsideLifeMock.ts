import { BsideLifeRequest, BsideLifeResponse, TimelineNode, DestinyFootnote } from "./bsideLifeTypes";

const careerPaths: Record<string, { titles: string[]; scenarios: string[] }> = {
  计算机科学与技术: {
    titles: ["初级开发工程师", "高级工程师", "技术总监", "CTO/创业者"],
    scenarios: ["在中关村写了第一行生产代码", "主导了千万级用户产品的重构", "带出了一支15人的团队", "开始用技术做点不一样的事"],
  },
  金融学: {
    titles: ["银行柜员", "投资经理", "基金合伙人", "独立投资人"],
    scenarios: ["在陆家嘴的第一个月瘦了五斤", "操盘了一只年化18%的基金", "在港股熔断那天失眠到天亮", "终于有时间学做饭了"],
  },
  建筑学: {
    titles: ["实习建筑师", "项目建筑师", "事务所合伙人", "跨界创作者"],
    scenarios: ["在工作室通宵改了第三版模型", "第一个独立设计的民宿获得了行业奖", "住在村里两个月做乡村改造", "开始画插画，意外火了"],
  },
  法学: {
    titles: ["实习律师", "执业律师", "律所合伙人", "公益法律人"],
    scenarios: ["第一次独自出庭，手心全是汗", "打赢了一场看似不可能的诉讼", "带出了自己的律师团队", "开始为弱势群体做免费法律援助"],
  },
  临床医学: {
    titles: ["住院医师", "主治医师", "科室主任", "医学教授"],
    scenarios: ["第一次值夜班独自处理了急诊", "发表了第一篇SCI论文", "带的规培生已经能独当一面", "开始用科普改变更多人的健康观念"],
  },
  人工智能: {
    titles: ["算法工程师", "高级算法专家", "AI实验室负责人", "AI产品创始人"],
    scenarios: ["训练了第一个视觉模型，准确率比前辈高了3%", "主导了公司的核心推荐系统升级", "在国际会议上做了邀请报告", "开始思考AI如何真正帮助每个人"],
  },
  英语: {
    titles: ["翻译实习生", "同声传译", "翻译公司创始人", "文化桥梁"],
    scenarios: ["第一次做同传，翻译到声音发抖", "为一场国际峰会做了全天同传", "创办了自己的翻译工作室", "开始翻译那本一直想翻译的小说"],
  },
  新闻学: {
    titles: ["实习记者", "深度报道记者", "主编", "独立内容创作者"],
    scenarios: ["第一个暗访报道被撤稿了，但证据留了下来", "写了一篇改变了政策的深度调查", "带出的年轻记者拿了新闻奖", "开始做自己的播客，说那些报纸放不下的话"],
  },
  心理学: {
    titles: ["心理咨询助理", "心理咨询师", "心理机构创始人", "心灵写作者"],
    scenarios: ["第一次独立完成咨询，来访者在结束时笑了", "在社区做免费心理热线，接了300通电话", "开了自己的咨询工作室", "开始写那些咨询室里说不完的故事"],
  },
};

function getCareerPath(major: string) {
  for (const [key, value] of Object.entries(careerPaths)) {
    if (major.includes(key) || key.includes(major)) return value;
  }
  const keys = Object.keys(careerPaths);
  return careerPaths[keys[Math.floor(Math.random() * keys.length)]];
}

function generateTimeline(request: BsideLifeRequest, bsideMajor: string): TimelineNode[] {
  const { year, actualMajor } = request;
  const aPath = getCareerPath(actualMajor);
  const bPath = getCareerPath(bsideMajor);

  const intervals = [0, 2, 5, 8, 10];
  const aSideCount = Math.min(aPath.titles.length, aPath.scenarios.length);
  const bSideCount = Math.min(bPath.titles.length, bPath.scenarios.length);

  return intervals.map((yearsAfter, i) => {
    const aIdx = Math.min(i, aSideCount - 1);
    const bIdx = Math.min(i, bSideCount - 1);
    return {
      year: year + yearsAfter + (yearsAfter === 0 ? 4 : yearsAfter),
      yearsAfter: yearsAfter === 0 ? 4 : yearsAfter,
      aSide: {
        title: yearsAfter === 0 ? `毕业季·${aPath.titles[aIdx]}` : `${aPath.titles[aIdx]}`,
        description: aPath.scenarios[aIdx],
      },
      bSide: {
        title: yearsAfter === 0 ? `毕业季·${bPath.titles[bIdx]}` : `${bPath.titles[bIdx]}`,
        description: bPath.scenarios[bIdx],
      },
    };
  });
}

const footnotes: DestinyFootnote[] = [
  { sense: "触觉", detail: "你的手背上有一道浅浅的疤，那是大二那年实验课上留下的。每次摸到它，都会想起那个阳光很好的下午。" },
  { sense: "嗅觉", detail: "你至今闻到松木味就会心安——那是在野外作业时帐篷里的味道，混着泥土和风。" },
  { sense: "听觉", detail: "凌晨三点的键盘声、手术室的心电监护声、交易大厅的倒计时——有一种声音只属于你的职业，别人听不出区别。" },
  { sense: "味觉", detail: "你学会了一道菜，只有在那个城市才做得出那个味道。你试过无数次，差的就是那家菜市场的酱油。" },
  { sense: "视觉", detail: "你的手机相册里有一张照片，拍的是凌晨五点的窗外。你记得当时在想什么，但从未告诉任何人。" },
];

export function generateMockResponse(request: BsideLifeRequest, bsideMajor: string): BsideLifeResponse {
  return {
    bsideMajor,
    timeline: generateTimeline(request, bsideMajor),
    destinyFootnote: footnotes[Math.floor(Math.random() * footnotes.length)],
  };
}
