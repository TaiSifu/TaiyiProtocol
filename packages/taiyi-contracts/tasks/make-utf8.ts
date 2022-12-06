//yarn task:make-utf8
import { task } from 'hardhat/config';
import { String2UTF8X } from '../utils/genUTF8';

const process_args = require('minimist')(process.argv.slice(2));

task('make-utf8', 'make utf')
    .setAction(async (args, { ethers }) => {        
        if(0) {
            let labels = [
                "不存在",
                "死亡",
                "活着"
            ];
        
            for(var i=0; i<labels.length; i++) {
                console.log(`\"${String2UTF8X(labels[i])}\", \/\/${labels[i]}`);
            }
        }
        
        if(0) {
            let labels = [
                "起源宙",   //138亿年前，宇宙大爆炸，时空物质能量分离
                "恒星宙",   //132亿年前，最初恒星开始闪耀，创造新元素
                "新星宙",   //恒星宙至今，超新星，重元素，化合作用
                "太阳系",   //45亿年前，太阳系形成，新天体，化学复杂性，地质纪元
                "生命诞生", //38亿年前，细胞产生，新陈代谢，繁殖，适应，地质纪元
                "大型生物", //6亿年前，进化，恐龙灭绝，地质纪元
                "智人",    //700万年-20万年前，人类产生，直立人，智人，集体学习开始，地质纪元
                "远古时期", //石器、铜器、铁器，公元纪元
                "中世纪",   //黑暗、古风、封建、城堡、帝王，公元纪元
                "启蒙时期", //文艺复兴，地理发现，公元纪元
                "殖民时代", //蒸汽、帝国，公元纪元
                "现代",     //电气、原子
                "当代",     //信息、生物、量子
                "未来百年"
            ];
        
            for(var i=0; i<labels.length; i++) {
                console.log(`\"${String2UTF8X(labels[i])}\", \/\/${labels[i]}`);
            }
        }
        
        if(0) {
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
        
            for(var i=0; i<labels.length; i++) {
                console.log(`\"${String2UTF8X(labels[i])}\", \/\/${labels[i]}`);
            }
        }
        
        if(0) {
            let labels = [
                "信息",
                "质量",
                "能量",
                "稳定性",
            ];
        
            for(var i=0; i<labels.length; i++) {
                console.log(`\"${String2UTF8X(labels[i])}\", \/\/${i}.${labels[i]}`);
            }
        }
        
        if(0) {
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
        
            for(var i=0; i<labels.length; i++) {
                //console.log(`\"${String2UTF8X(labels[i])}\", \/\/${i}.${labels[i]}`);
                console.log(`\"${i+1}\" : {
                    \"parentZone\" : ${i%15 + 1},
                    \"name\" : \"${labels[i]}\"
                },`);
            }
        }
        
        if(0) {
            let labels = [
                "下九流",   //(城市)
                "下九流",   //(市镇)
                "下九流",   //(山寨)
                "农户",     //(村庄)
                "病乞丐",     //(恶丐窝)
                "小毛贼",     //(贼人营寨)
                "地痞",     //(悍匪砦)
                "亡命徒",     //(恶人谷)
                "狐媚子",     //(迷香阵)
                "鬼仆",     //(乱葬岗)
                "妖乐师",     //(异士居)
                "异疆怪人",     //(邪人死地)
                "丧心侠士",     //(修罗场)
                "疯魔",     //(群魔乱舞)
                "绝境客",     //(弃世绝境)
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
        
            for(var i=0; i<labels.length; i++) {
                //console.log(`\"${String2UTF8X(labels[i])}\", \/\/${i}.${labels[i]}`);
                console.log(`\"${i+1}\" : {
                    \"name\" : \"${labels[i]}\"
                },`);
            }
        }
        
        if(0) {
            let labels = ["零","一","二","三","四","五","六","七","八","九","十"];
        
            for(var i=0; i<labels.length; i++) {
                console.log(`\"${String2UTF8X(labels[i])}\", \/\/${i}.${labels[i]}`);
            }
        }
        
        if(0) {
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
        
            for(var i=0; i<labels.length; i++) {
                console.log(`\"${String2UTF8X(labels[i])}\", \/\/${i}.${labels[i]}`);
            }
        }
        
        
        if(1) {
            console.log(String2UTF8X("你四处飘荡。"));
        }

    });
