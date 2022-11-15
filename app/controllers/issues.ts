import { Etapa } from '../enums/etapa.enum.js'
import { Utils } from '../utils/utils.js'
import { Diretorios } from '../models/diretorios.js'
import { ConfigModel } from '../models/config.js'

export class Issues {
  public static async create(pathToConfig: string) {
    const config = new ConfigModel(pathToConfig)
    const nome_issue: string = await Utils.selecionaNomes(
      'Insira o nome da issue ',
      'Nome issue (exemplo: TSS-1234)'
    )
    if (!nome_issue || !await Utils.validaDadosInformados(nome_issue)) {
      Utils.MostraMensagemErro(` ${nome_issue}, Não é um nome válido`)
    } else {
      const selecionado = await this.selectStatus(nome_issue)
      switch (selecionado) {
        case Etapa.Codificacao:
          Diretorios.criar(nome_issue, config.data.issue_codificacao, Etapa.Codificacao)
          break
        case Etapa.TesteUnitario:
          Diretorios.criar(nome_issue, config.data.issue_tu, Etapa.TesteUnitario)
          Diretorios.copiaPasta(config.data.arquivos_romana + nome_issue, config.data.issue_tu + nome_issue)
          break
        case Etapa.TesteIntegrado:
          Diretorios.criar(nome_issue, config.data.issue_ti, Etapa.TesteIntegrado)
          Diretorios.copiaPasta(config.data.arquivos_romana + nome_issue, config.data.issue_ti + nome_issue)
          break
        default:
          break
      }
    }
  }

  private static async selectStatus(nome_issue: string) {
    const options = [Etapa.Codificacao, Etapa.TesteUnitario, Etapa.TesteIntegrado]
    const placeHolder = `selecione a etapa atual do desenvolvimento da issue ${nome_issue}`
    const selecionado = await Utils.selecionaDados(options, placeHolder)
    return selecionado
  }
}
