import WsServer from 'App/Services/WsServer'
import ChatModel from 'App/Models/Chat'
WsServer.boot()

WsServer.io.on('connection', (socket) => {
	socket.on('chat:send', (data) => {
		ChatModel.create({
			trx_id: data.trx_id,
			room_id: data.room_id,
			send_user_id: data.send_user_id,
			message: data.message,
			reply_to: data.reply_to
		})
		
		socket.emit('chat:send:receive-'+data.room_id, {
			message: data.message,
			trx_id: data.trx_id,
			send_user_id: data.send_user_id,
			reply_to: data.reply_to
		})
	})
	
	socket.on('chat:log', async (data) => {
		const logs = await ChatModel.logs(data.room_id)
		WsServer.io.emit('chat:log:receive-'+data.room_id, {
			logs: logs
		})
	})

	socket.on('disconnect', (reason) => {
		console.log(reason)
	})
})