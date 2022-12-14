// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

library XumiConstants {

    //actor attributes ID
    uint256 public constant ATTR_BASE_XUMI = 1000; // ID起始值
    uint256 public constant ATTR_INF = ATTR_BASE_XUMI;        // 信息 information INF
    uint256 public constant ATTR_MAS = ATTR_BASE_XUMI + 1;    // 质量 mass MAS
    uint256 public constant ATTR_ENG = ATTR_BASE_XUMI + 2;    // 能量 energy ENG
    uint256 public constant ATTR_STB = ATTR_BASE_XUMI + 3;    // 稳定性 stability STB

    //module ID
    uint256 public constant WORLD_MODULE_XUMI_TIMELINE  = 1000;
    uint256 public constant WORLD_MODULE_XUMI_ENERGY    = 1001;
    uint256 public constant WORLD_MODULE_XUMI_ELEMENT_H = 1002;
    uint256 public constant WORLD_MODULE_XUMI_ATTRIBUTES = 1003;
}
