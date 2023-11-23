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
exports.Blockchain = void 0;
class Blockchain {
    constructor(provider) {
        this._snapshotId = 0;
        this._provider = provider;
    }
    saveSnapshotAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendJSONRpcRequestAsync('evm_snapshot', []);
            this._snapshotId = Number(response);
        });
    }
    revertAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendJSONRpcRequestAsync('evm_revert', [this._snapshotId]);
        });
    }
    resetAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendJSONRpcRequestAsync('evm_revert', ['0x1']);
        });
    }
    increaseTimeAsync(duration) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sendJSONRpcRequestAsync('evm_increaseTime', [duration]);
        });
    }
    waitBlocksAsync(count) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < count; i++) {
                yield this.sendJSONRpcRequestAsync('evm_mine', []);
            }
        });
    }
    sendJSONRpcRequestAsync(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._provider.send(method, params);
        });
    }
}
exports.Blockchain = Blockchain;
