
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { IConfig } from '../interfaces/config'


export class ConfigModel {
  constructor(public file: any) {
    this.loadValues()
  }

  public data: IConfig;

  public reloadValues() {
    this.loadValues()
  }



  private _readFile(): string {
    if (existsSync(this.file)) {
      return readFileSync(this.file, { encoding: 'utf-8' })
    }
    else {
      this.data = null
      this._saveFile(this.data)
      return readFileSync(this.file, { encoding: 'utf-8', flag: 'r+' })
    }
  }

  private _saveFile(data: IConfig) {
    return writeFileSync(this.file, JSON.stringify(data), { encoding: 'utf-8' })
  }

  public loadValues() {
    let file: IConfig
    file = JSON.parse(this._readFile())
    if (file) {
      this.data = file
    }
  }

  public save(data: IConfig) {
    this._saveFile(data)
    this.reloadValues()
    return this.data
  }
}
