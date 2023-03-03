"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstructorArgumentsBookShareFilePath = exports.getAddressBookShareFilePath = void 0;
function getAddressBookShareFilePath(type) {
    return `${process.cwd()}/addresses/${type}.json`;
}
exports.getAddressBookShareFilePath = getAddressBookShareFilePath;
function getConstructorArgumentsBookShareFilePath(type) {
    return `${process.cwd()}/addresses/${type}_const_args.json`;
}
exports.getConstructorArgumentsBookShareFilePath = getConstructorArgumentsBookShareFilePath;
