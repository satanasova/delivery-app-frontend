import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user/user.model';
import { Message, MessageType } from './models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messagesObs: BehaviorSubject<Message[]> = new BehaviorSubject([] as Message[])
  allMessages: Message[] = [];

  constructor() { 
    const userHaci: User = {id:'23', name: 'Haci Hacev', email: 'hackohackob@gmail.com', avatarUrl: 'https://ih1.redbubble.net/image.2253860100.5603/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg'};
    const userPecka: User = {id: '25', email: 's.e.atanasowa@gmail.com', name: 'Pecka', avatarUrl: 'https://ih1.redbubble.net/image.2253860100.5603/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg'};
    const userMathRandom: User = {id: '27', email: 'mathr@gmail.com', name: 'MathRandom', avatarUrl: 'https://ih1.redbubble.net/image.2253860100.5603/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg'};

    this.messagesObs.next([
      {
        type: MessageType.text,
        text: 'Hi, I am Peci',
        reply: false,
        sender: userPecka,
        date: new Date(),
      },
      {
        type: MessageType.text,
        text: 'Hi, I am Haci',
        reply: true,
        sender: userHaci,
        date: new Date(),
      }
    ]);


    const interval = setInterval(() => {
      this.messagesObs.next([{
        type: MessageType.text,
        text: 'Hi,' + Math.random(),
        reply: false,
        sender: userMathRandom,
        date: new Date(),
      },])
    }, 10000);

    setTimeout(() => {
      clearInterval(interval);
    }, 20000)
  }

  sendMessage(msg: Message) {
    this.messagesObs.next([msg])
  }
}
