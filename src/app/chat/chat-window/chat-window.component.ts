import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, merge, Observable } from 'rxjs';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { ChatService } from '../chat.service';
import { Message, MessageType } from '../models';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {
  user?: User;
  messages: Message[] = [];
  newMessages: Message[] = [];
  chatMin: boolean = true;
  chatOpenedObs: BehaviorSubject<Date> = new BehaviorSubject(new Date(0));
  unreadMsgsCount: number = 0;

  constructor(private userService: UserService, private chatService: ChatService) {
    this.chatService.messagesObs.subscribe((msgs: Message[]) => {
      this.messages.push(...msgs);
      this.chatOpenedObs.subscribe((lastTime: Date) => {
        this.newMessages = this.messages.filter((msg: Message) => msg.reply === false && +msg.date > +lastTime && this.chatMin);
        this.unreadMsgsCount = this.newMessages.length;
        console.log('new msgs', this.newMessages);
        console.log('last time chat was opened', lastTime);
      })
    });

    this.userService.loggedUser.subscribe((loggedUser: User | null) => loggedUser ? this.user = loggedUser : null);
  }

  ngOnInit() {
  }

  sendMessage(event: any) {
    const msg: Message = {
      type: MessageType.text,
      text: event.message,
      reply: true,
      sender: this.user as User,
      date: new Date()
    }

    this.chatService.sendMessage(msg);
  }

  toggleMinimizeChat() {
    if(this.chatMin) {
      this.chatOpenedObs.next(new Date());
    }

    this.chatMin = !this.chatMin;
  }

}
