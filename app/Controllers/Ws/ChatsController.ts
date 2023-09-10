// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WsServer from 'App/Services/WsServer'
import ChatModel from 'App/Models/Chat'

export default class ChatsController {
	// チャット処理
	public async store() {
		WsServer.io.on('chat:send', (data) => {
			ChatModel.create({
				room_id: data.room_id,
				send_user_id: data.user_id,
				message: data.message,
				reply_to: data.reply_to
			})
			
			WsServer.io.emit('chat:receive-'+data.room_id, {
				message: data.message,
				reply_to: data.reply_to
			})
		})
	}
}
