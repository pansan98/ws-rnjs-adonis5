// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import WsServer from 'App/Services/WsServer'
import ChatModel from 'App/Models/Chat'

export default class ChatsController {
	// チャット処理
	public async store() {
		WsServer.io.on('chat:send', (data) => {
			ChatModel.create({
				trx_id: data.trx_id,
				room_id: data.room_id,
				send_user_id: data.user_id,
				message: data.message,
				reply_to: data.reply_to
			})
			
			WsServer.io.emit('chat:send:receive-'+data.room_id, {
				message: data.message,
				trx_id: data.trx_id,
				send_user_id: data.user_id,
				reply_to: data.reply_to
			})
		})

		WsServer.io.on('chat:log', async (data) => {
			const logs = await ChatModel.logs(data.room_id)
			WsServer.io.emit('chat:log:receive-'+data.room_id, {
				logs: logs
			})
		})
	}
}
