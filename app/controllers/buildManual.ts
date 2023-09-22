
import { Utils } from "../utils/utils";

export class buildManual {

  static async novo(pathToAppServer: string) {
    const nome_issue: string = await Utils.selecionaNomes(
      'Datasul: Insira o nome da issue',
      'Nome issue (exemplo: TSS-1234)'
    )
    const nome_projeto: string = await Utils.selecionaNomes(
      'Datasul: Insira o nome do projeto',
      'Nome issue (exemplo: totvs-projeto)'
    )

    let getUrl = 'http://prado:8080/crumbIssuer/api/json'
    let postUrl = `http://prado:8080/view/Build-Manual/job/Compila_manual_Azure_THF2-CL_Desacoplado/buildWithParameters?repositorio=${nome_projeto.trim()}&branch=${nome_issue.trim()}&issue=${nome_issue.trim()}&artefato=${nome_projeto.trim()}`

    let resp = await fetch(getUrl)
    let crumbResp = await resp.json()
    let cookie = resp.headers.get('set-cookie')
    let headers = {
      'Jenkins-Crumb': crumbResp.crumb,
      'Cookie': cookie,
    }
    let reponse = await fetch(postUrl, {
      method: 'POST', headers: headers
    })
    console.log(reponse);
    let location = reponse.headers.get('Location')

    let resp2 = await fetch(`${location}/api/json`)
    let json = await resp2.json()

    console.log(json)
    let url = json.executable.url
    console.log(url)
  }
}