import { Component, OnInit } from "@angular/core";
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
export class AppComponent implements OnInit {

  // config: IConfig;

  ngOnInit(): void {
    vscode.postMessage({
      command: 'onload',
    })

    let config = vscode.getState();
  }

  async selectFolder(elementName: string) {
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

}
