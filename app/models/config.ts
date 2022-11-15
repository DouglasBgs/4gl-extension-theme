
import { readFileSync, writeFileSync } from 'fs'
import { IConfig } from '../interfaces/config'


export class ConfigModel {
  constructor(public file: any) {
    this.loadValues()
  }

  public data: IConfig;

  public reloadValues() {
    this.loadValues()
  }

  private _readFile() {
    return readFileSync(this.file, 'utf-8')
  }

  private _saveFile(data: IConfig) {
    return writeFileSync(this.file, JSON.stringify(data), 'utf-8')
  }

  public loadValues() {
    let file: IConfig
    file = JSON.parse(this._readFile())
    if (file) {
      this.data = file
    } else {
      throw new Error('Não foi possível ler o arquivo')
    }
  }

  public save(data: IConfig) {
    this._saveFile(data)
    this.reloadValues()
    return this.data
  }
}
