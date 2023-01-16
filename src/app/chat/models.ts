import { User } from "../user/user.model"

export type Message = {
  type: MessageType,
  text: string,
  reply: boolean,
  sender: User,
  date: Date
}

export enum MessageType {
  text = 'text',
  img = 'image',
}