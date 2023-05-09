import { Component, OnInit, HostListener } from "@angular/core";
import {
  provideVSCodeDesignSystem,
  allComponents
} from "@vscode/webview-ui-toolkit";
import { vscode } from "./utilities/vscode";
import { IConfig } from "./utilities/interfaces/config";


provideVSCodeDesignSystem().register(allComponents);

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent   {

   config: IConfig;

   constructor() {

    this.config = <IConfig> vscode.getState();
   }



  async selectFolder(elementName: string) {
    console.log(elementName);
    await vscode.postMessage({
      command: 'selectFolder',
      elementName: elementName
    })
  }
  async selectFile(elementName: string, type: Array<string>) {
    await vscode.postMessage({
      command: 'selectFile',
      elementName: elementName,
      type: type
    })
  }

  removeRpo(version: string) {
    vscode.postMessage({
      command: 'removeRpo',
      rpoVersion: version
    })
  }
  adicionaRpo(version: string) {
    vscode.postMessage({
      command: 'addRpo',
      rpoVersion: version
    })
  }

  submit(close: boolean) {
    vscode.postMessage({
      command: 'save',
      close: close,
      data: null
    })
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: any) {
    const command = event.data.command
    switch (command) {
        // case 'SelectedFolder':
        //     document.querySelector(`#${event.data.elementId}`).value = event.data.folder
        //     break;
        case 'SelectedPath':
            console.log(event.data.config);
            this.config = event.data.config;
            break;
        // case 'SelectedFile':
        //     document.querySelector(`#${event.data.elementId}`).value = event.data.file
        //     break;
        default:
            break;
    }
  }

}
