// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library WorldConstants {

    //special actors ID
    uint256 public constant ACTOR_PANGU = 1;

    //actor attributes ID
    uint256 public constant ATTR_BASE = 0;
    uint256 public constant ATTR_AGE = 0; // 年龄
    uint256 public constant ATTR_HLH = 1; // 健康，生命
    uint256 public constant ATTR_BASE_CHARM = 10; // ID起始值
    uint256 public constant ATTR_MEL = 10; // 魅力
    uint256 public constant ATTR_BASE_MOOD = 20; // ID起始值
    uint256 public constant ATTR_XIQ = 20; // 心情
    uint256 public constant ATTR_BASE_CORE = 30; // ID起始值
    uint256 public constant ATTR_LVL = 30; // 膂力
    uint256 public constant ATTR_TIZ = 31; // 体质
    uint256 public constant ATTR_LIM = 32; // 灵敏
    uint256 public constant ATTR_GEG = 33; // 根骨
    uint256 public constant ATTR_WUX = 34; // 悟性
    uint256 public constant ATTR_DIL = 35; // 定力
    uint256 public constant ATTR_BASE_BEHAVIOR = 40;
    uint256 public constant ATTR_ACT = 40; // 行动力

    //module ID
    uint256 public constant WORLD_MODULE_ACTORS       = 0;
    uint256 public constant WORLD_MODULE_RANDOM       = 1;
    uint256 public constant WORLD_MODULE_EVENTS       = 2;
    uint256 public constant WORLD_MODULE_TIMELINE     = 3;
    uint256 public constant WORLD_MODULE_NAMES        = 4;
    uint256 public constant WORLD_MODULE_ATTRIBUTES   = 5;    //基本属性
    uint256 public constant WORLD_MODULE_TALENTS      = 6;

    uint256 public constant WORLD_MODULE_FOOD         = 7; //食材
    uint256 public constant WORLD_MODULE_WOOD         = 8; //木材
    uint256 public constant WORLD_MODULE_GOLD         = 9; //金石
    uint256 public constant WORLD_MODULE_FABRIC       = 10; //织物
    uint256 public constant WORLD_MODULE_HERB         = 11; //药材
    uint256 public constant WORLD_MODULE_COIN         = 12; //银钱

    uint256 public constant WORLD_MODULE_CHARM_ATTRIBUTES     = 13; //魅力属性
    uint256 public constant WORLD_MODULE_MOOD_ATTRIBUTES      = 14; //情绪属性
    uint256 public constant WORLD_MODULE_CORE_ATTRIBUTES      = 15; //核心属性

    uint256 public constant WORLD_MODULE_ZONES        = 16; //地区
    uint256 public constant WORLD_MODULE_BEHAVIOR_ATTRIBUTES  = 17; //行动属性

    uint256 public constant WORLD_MODULE_PRESTIGE     = 18; //威望
    uint256 public constant WORLD_MODULE_SIDS         = 19; //身份
    uint256 public constant WORLD_MODULE_RELATIONSHIP = 20; //关系
    uint256 public constant WORLD_MODULE_ITEMS        = 21; //物品

    uint256 public constant WORLD_MODULE_PRELIFES     = 22; //前世
    uint256 public constant WORLD_MODULE_SEASONS      = 23; //时节
    uint256 public constant WORLD_MODULE_BORN_PLACES  = 24; //出生地
    uint256 public constant WORLD_MODULE_ZONE_BASE_RESOURCES  = 25; //地区基本资源

    uint256 public constant WORLD_MODULE_ACTOR_LOCATIONS  = 26; //角色定位
    uint256 public constant WORLD_MODULE_VILLAGES     = 27; //聚居区（村庄）
    uint256 public constant WORLD_MODULE_BUILDINGS    = 28; //建筑物

    uint256 public constant WORLD_MODULE_TRIGRAMS_RENDER     = 29; //角色符文渲染器
    uint256 public constant WORLD_MODULE_TRIGRAMS     = 30; //角色符文数据

    uint256 public constant WORLD_MODULE_SIFUS        = 31; //师傅令牌

    uint256 public constant WORLD_MODULE_ACTOR_TIMELINE_LASTAGES  = 32; //角色在对应时间线上的最后年龄
    uint256 public constant WORLD_MODULE_YEMINGS  = 33; //噎明权限记录
}
