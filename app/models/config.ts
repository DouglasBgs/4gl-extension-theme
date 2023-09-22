
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
     return this._seedData()
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
    } else {
      this._seedData();
    }
  }

  public save(data: IConfig) {
    this._saveFile(data)
    this.reloadValues()
    return this.data
  }

  private _seedData() { 
    this.data = this.configData()
    this._saveFile(this.data)
    return readFileSync(this.file, { encoding: 'utf-8', flag: 'r+' })
  }

  private configData(): IConfig {
    return {
      issue_codificacao: '',
      issue_tu: '',
      issue_ti: '',
      evidencia: '',
      arquivos_romana: '',
      arquivo_log_appserver: '',
      appserver: '',
      tss: '',
      dbacess_tss: '',
      rpo_local: '',
      rpo_rede: [],
      arquivo_log_appserver_64: '',
      appserver_64: '',
      tss_64: '',
      dbacess_tss_64: '',
      rpo_local_64: '',
      rpo_rede_64: [],
      tomcat_datasul: '',
      compilado_ems: '',
      compilado_datasul: '',
      jenkins_url: new URL('')
    }
  } 
}
