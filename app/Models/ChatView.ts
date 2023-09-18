import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ChatView extends BaseModel {
  public static table = 'chat_views'

  @column({ isPrimary: true })
  public id: number

  @column()
  public chat_id: number

  @column()
  public receive_user_id: number

  @column()
  public room_id: number

  @column()
  public viewed: boolean
}
