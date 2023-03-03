"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//yarn task:make-utf8
const config_1 = require("hardhat/config");
const genUTF8_1 = require("../utils/genUTF8");
const process_args = require('minimist')(process.argv.slice(2));
(0, config_1.task)('make-utf8', 'make utf')
    .setAction((args, { ethers }) => __awaiter(void 0, void 0, void 0, function* () {
    if (0) {
        let labels = [
            "不存在",
            "死亡",
            "活着"
        ];
        for (var i = 0; i < labels.length; i++) {
            console.log(`\"${(0, genUTF8_1.String2UTF8X)(labels[i])}\", \/\/${labels[i]}`);
        }
    }
    if (0) {
        let labels = [
            "起源宙",
            "恒星宙",
            "新星宙",
            "太阳系",
            "生命诞生",
            "大型生物",
            "智人",
            "远古时期",
            "中世纪",
            "启蒙时期",
            "殖民时代",
            "现代",
            "当代",
            "未来百年"
        ];
        for (var i = 0; i < labels.length; i++) {
            console.log(`\"${(0, genUTF8_1.String2UTF8X)(labels[i])}\", \/\/${labels[i]}`);
        }
    }
    if (0) {
        let labels = [
            "冬至",
            "大雪",
            "小雪",
            "立冬",
            "霜降",
            "寒露",
            "秋分",
            "白露",
            "处暑",
            "立秋",
            "大暑",
            "小暑",
            "夏至",
            "芒种",
            "小满",
            "立夏",
            "谷雨",
            "清明",
            "春分",
            "惊蛰",
            "雨水",
            "立春",
            "大寒",
            "小寒"
        ];
        for (var i = 0; i < labels.length; i++) {
            console.log(`\"${(0, genUTF8_1.String2UTF8X)(labels[i])}\", \/\/${labels[i]}`);
        }
    }
    if (0) {
        let labels = [
            "信息",
            "质量",
            "能量",
            "稳定性",
        ];
        for (var i = 0; i < labels.length; i++) {
            console.log(`\"${(0, genUTF8_1.String2UTF8X)(labels[i])}\", \/\/${i}.${labels[i]}`);
        }
    }
    if (0) {
        let labels = [
            //0-14
            "京城", "成都", "桂州", "襄阳", "太原", "广州", "青州", "江陵", "福州", "辽阳", "秦州", "大理", "寿春", "杭州", "扬州",
            //15-29
            "嵩山", "峨眉山", "白鹿泽", "武当山", "大小元山", "莲花山", "然山", "璇女峰", "湛卢山", "空桑山", "昆仑山", "黑水", "界青崖", "赤明岛", "血犼谷",
            //30-134
            "洛阳", "梓州", "邕州", "京兆", "大同", "南海", "勃海", "巫山", "泉州", "长白山", "青海", "滇南泽", "庐州", "苏州", "东海",
            "大名", "岷山", "赤水", "夔州", "阴山", "惠州", "泰山", "潭州", "漳州", "东金山", "祁连山", "善阐", "黄山", "太湖", "江宁",
            "恒山", "青城山", "漓水", "鄂州", "五台山", "罗浮山", "燕京", "衡山", "温州", "辽河", "兰州", "澜沧江", "淮水", "临海", "淮安",
            "太行山", "龙门山", "琼州", "汉水", "真定", "梅州", "济水", "湘水", "武夷山", "鸭绿江", "兴元", "西洱河", "庐山", "西湖", "徐州",
            "王屋山", "涪江", "猫儿山", "华山", "河中", "潮州", "蓬莱", "洞庭湖", "琉球", "开京", "六盘山", "无量山", "九华山", "普陀山", "茅山",
            "保州", "丽水", "大明山", "九宫山", "汾水", "南岭", "梁山", "九嶷山", "澎湖", "燕山", "大雪山", "怒江", "天柱山", "彭蠡泽", "彭泽湖",
            "汴水", "黄龙溪", "象鼻山", "木兰山", "贺兰山", "白云山", "柴山", "武陵山", "雁荡山", "混同江", "凤翔", "朱提", "巢湖", "仙霞岭", "苍梧山"
        ];
        for (var i = 0; i < labels.length; i++) {
            //console.log(`\"${String2UTF8X(labels[i])}\", \/\/${i}.${labels[i]}`);
            console.log(`\"${i + 1}\" : {
                    \"parentZone\" : ${i % 15 + 1},
                    \"name\" : \"${labels[i]}\"
                },`);
        }
    }
    if (0) {
        let labels = [
            "下九流",
            "下九流",
            "下九流",
            "农户",
            "病乞丐",
            "小毛贼",
            "地痞",
            "亡命徒",
            "狐媚子",
            "鬼仆",
            "妖乐师",
            "异疆怪人",
            "丧心侠士",
            "疯魔",
            "绝境客",
            "乞丐",
            "手艺人",
            "大夫",
            "商人",
            "文人",
            "豪富",
            "权贵",
            "城主",
            "乞丐",
            "农户",
            "手艺人",
            "大夫",
            "商人",
            "文人",
            "豪富",
            "权贵",
            "村长",
            "乞丐",
            "手艺人",
            "大夫",
            "商人",
            "文人",
            "豪富",
            "权贵",
            "镇长",
            "乞丐",
            "手艺人",
            "大夫",
            "商人",
            "文人",
            "豪富",
            "二当家",
            "大当家"
        ];
        for (var i = 0; i < labels.length; i++) {
            //console.log(`\"${String2UTF8X(labels[i])}\", \/\/${i}.${labels[i]}`);
            console.log(`\"${i + 1}\" : {
                    \"name\" : \"${labels[i]}\"
                },`);
        }
    }
    if (0) {
        let labels = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
        for (var i = 0; i < labels.length; i++) {
            console.log(`\"${(0, genUTF8_1.String2UTF8X)(labels[i])}\", \/\/${i}.${labels[i]}`);
        }
    }
    if (0) {
        let labels = [
            "下·九品",
            "中·八品",
            "上·七品",
            "奇·六品",
            "秘·五品",
            "极·四品",
            "超·三品",
            "绝·二品",
            "神·一品"
        ];
        for (var i = 0; i < labels.length; i++) {
            console.log(`\"${(0, genUTF8_1.String2UTF8X)(labels[i])}\", \/\/${i}.${labels[i]}`);
        }
    }
    if (1) {
        console.log((0, genUTF8_1.String2UTF8X)("你具备了结构。"));
    }
}));
