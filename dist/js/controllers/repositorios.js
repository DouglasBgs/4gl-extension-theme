"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioController = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
class RepositorioController {
    constructor(file) {
        this.file = file;
    }
    _readFile() {
        return (0, path_1.join)(this.file);
    }
    get values() {
        return this._readFile();
    }
    reloadImports() {
        const repositorio = JSON.parse((0, fs_1.readFileSync)(this.file, "utf8"));
        return repositorio;
    }
}
exports.RepositorioController = RepositorioController;
//# sourceMappingURL=repositorios.js.map