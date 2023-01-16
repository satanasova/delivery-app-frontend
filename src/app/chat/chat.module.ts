import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { NbBadgeModule, NbChatModule, NbIconModule } from '@nebular/theme';



@NgModule({
  declarations: [
    ChatWindowComponent
  ],
  imports: [
    CommonModule,
    NbChatModule,
    NbIconModule,
    NbBadgeModule
  ],
  exports: [ChatWindowComponent]
})
export class ChatModule { }
