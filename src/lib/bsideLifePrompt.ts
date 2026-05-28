import { BsideLifeRequest } from "./bsideLifeTypes";

export function buildPrompt(request: BsideLifeRequest, bsideMajor: string): string {
  const { year, score, actualMajor } = request;

  return `你是一位命运分叉叙事大师。用户将告诉你他们的高考年份、分数和实际就读专业。他们选择了一个"B面"方向——如果当初选了另一个专业，人生会怎样。

输入信息：
- 高考年份: ${year}年（这是${year}年的中国，请确保时代背景准确）
- 高考分数: ${score}分
- A面专业（实际就读）: ${actualMajor}
- B面专业（平行世界）: ${bsideMajor}

请生成一个平行人生时间线，要求：

1. 生成5个时间线节点，从高考后4年（毕业）开始，跨度10年以上，间隔不均匀（如4年、2年、3年、2年）
2. 每个节点同时描述A面（现实人生）和B面（平行人生），各1-2句话
3. B面人生必须真实可信——不是爽文，也有自己的遗憾和辛苦，但一定有不同的质感
4. B面的职业路径必须从${bsideMajor}专业逻辑推导，不要凭空想象
5. 时代背景必须准确——${year}年入学，毕业约${year + 4}年，之后的职业发展要符合那个年代的中国现实
6. 语气克制，像朋友在喝酒时讲的故事，不像小说，不要文艺腔

最后，生成一个"命运注脚"——一个感官细节（嗅觉/听觉/触觉/味觉/视觉），捕捉B面人生最独特的一个体验瞬间。必须具体到感官，让人起鸡皮疙瘩。

严格以以下JSON格式返回，不要有任何其他文字：
{
  "timeline": [
    {
      "year": 绝对年份,
      "yearsAfter": 距高考年数,
      "aSide": { "title": "阶段标题", "description": "1-2句描述" },
      "bSide": { "title": "阶段标题", "description": "1-2句描述" }
    }
  ],
  "destinyFootnote": {
    "sense": "嗅觉/听觉/触觉/味觉/视觉",
    "detail": "一个感官化的句子"
  }
}`;
}
