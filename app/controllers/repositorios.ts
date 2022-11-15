import { join } from 'path'
import { readFileSync } from 'fs'
export class RepositorioController {
  constructor(public file: string) { }

  private _readFile() {
    return join(this.file)
  }

  public get values() {
    return this._readFile()
  }

  public reloadImports() {

    const repositorio = JSON.parse(readFileSync(this.file, 'utf8'))
    return repositorio
  }
}
