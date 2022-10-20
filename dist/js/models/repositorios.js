"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModel = void 0;
const fs_1 = require("fs");
class ConfigModel {
    constructor(file) {
        this.file = file;
        this.loadValues();
    }
    reloadValues() {
        this.loadValues();
    }
    _readFile() {
        return (0, fs_1.readFileSync)(this.file, "utf-8");
    }
    loadValues() {
        let file;
        file = JSON.parse(this._readFile());
        if (file) {
            this.data = file;
        }
        else {
            throw new Error("Não foi possível ler o arquivo");
        }
    }
}
exports.ConfigModel = ConfigModel;
//# sourceMappingURL=repositorios.js.map