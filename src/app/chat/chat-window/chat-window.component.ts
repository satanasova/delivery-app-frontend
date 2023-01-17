import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, count, map, merge, Observable, scan } from 'rxjs';
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
  isChatMinimized: boolean = true;
  chatOpenedObs: BehaviorSubject<Date> = new BehaviorSubject(new Date(0));
  unreadMsgsCount: Observable<number>;

  constructor(private userService: UserService, public chatService: ChatService) {
    this.userService.loggedUser.subscribe((loggedUser: User | null) => loggedUser ? this.user = loggedUser : null);

    this.chatService.messagesObs.subscribe((msgs: Message[]) => this.messages.push(...msgs));

    const unreadMessagesObs = combineLatest([ 
      this.chatService.messagesObs.pipe(scan((allMsgs: Message[], newMsgs: Message[]) => [...allMsgs, ...newMsgs])),
      this.chatOpenedObs
    ]).pipe(
      map(([allMsgs, lastOpen]): Message[] => allMsgs.filter((msg: Message) => this.isChatMinimized && !msg.reply && +msg.date > +lastOpen))
    );

    this.unreadMsgsCount = unreadMessagesObs.pipe(
      map((unreadMsgs: Message[]) => unreadMsgs.length)
    )

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
    if(this.isChatMinimized) {
      this.chatOpenedObs.next(new Date());
    }

    this.isChatMinimized = !this.isChatMinimized;
  }

}
