// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library WorldConstants {

    //time constants
    uint256 public constant DAY = 1 days;
    uint256 public constant HOUR = 1 hours;
    uint256 public constant MINUTE = 1 minutes;
    uint256 public constant SECOND = 1 seconds;

    //top authority actors. 盘古
    uint256 public constant ACTOR_PANGU = 1;

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
}
