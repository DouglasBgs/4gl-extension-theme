import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
  vsCodePanelTab,
  vsCodeTextField,
  vsCodeDivider,
  vsCodeDropdown,
  vsCodePanels,
  vsCodePanelView,
} from '@vscode/webview-ui-toolkit';
import { vscode } from './utilities/vscode';
import { IConfig } from '../../../app/interfaces/config';

provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodePanelTab(),
  vsCodeTextField(),
  vsCodeDivider(),
  vsCodeDropdown(),
  vsCodePanels(),
  vsCodePanelView()
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  config: IConfig = new Object() as IConfig;

  ngOnInit(): void {
    vscode.postMessage({
      command: 'onload',
    });
  }

  @HostListener('window:message', ['$event'])
  onload(event: any) {
    const command = event.data.command;
    switch (command) {
      case 'SelectedFolder':
        break;
      case 'SelectedPath':
        this.config = event.data.config;
        console.log(this.config);
        break;
      case 'SelectedFile':
        // document.querySelector(`#${event.data.elementId}`).value = event.data.file
        break;
      default:
        break;
    }
  }

  selectFolder(element: AppComponent) {
    vscode.postMessage({
      command: 'selectFolder',
      elementName: element,
    });
  }
  selectFile(elementName: string, type: any) {
    vscode.postMessage({
      command: 'selectFile',
      elementName: elementName,
      type: type,
    });
  }
  adicionaRpo(version: any) {
    vscode.postMessage({
      command: 'addRpo',
      rpoVersion: version,
    });
  }
  removeRpo(version: any) {
    vscode.postMessage({
      command: 'removeRpo',
      rpoVersion: version,
    });
  }
  insertValues(rpo: any, list: any) {
    for (let i = 0; i < rpo.length; i++) {
      let option = document.createElement('vscode-option');
      option.textContent = rpo[i].name;
      list.appendChild(option);
    }
  }
  loadDropDown(rpo32: any, rpo64: any) {
    // let rpo32list = document.querySelector('#rpo32List');
    // rpo32list.replaceChildren(...[]);
    // this.insertValues(rpo32, rpo32list);
    // let rpo64list = document.querySelector('#rpo64List');
    // rpo64list.replaceChildren(...[]);
    // this.insertValues(rpo64, rpo64list);
  }
}
