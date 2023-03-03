"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkArray = void 0;
/**
 * Split an array into smaller chunks
 * @param array The array
 * @param size The chunk size
 */
const chunkArray = (array, size) => {
    const chunk = [];
    for (let i = 0; i < array.length; i += size) {
        chunk.push(array.slice(i, i + size));
    }
    return chunk;
};
exports.chunkArray = chunkArray;
