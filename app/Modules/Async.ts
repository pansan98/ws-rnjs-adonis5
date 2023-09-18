import ChatModel from 'App/Models/Chat'
import ChatViewModel from 'App/Models/ChatView'
import UserInRoomModel from 'App/Models/UserInRoom'

export default class AsyncModule {
	public static async chatsend(data) {
		const chat = await ChatModel.create({
			trx_id: data.trx_id,
			room_id: data.room_id,
			send_user_id: data.send_user_id,
			message: data.message,
			reply_to: data.reply_to
		})

		const room_users = await UserInRoomModel.inUsers(data.send_user_id, data.room_id)
		if(room_users?.length) {
			room_users.map(async (user) => {
				await ChatViewModel.create({
					chat_id: chat.id,
					receive_user_id: user.id,
					room_id: data.room_id,
					viewed: false
				})
			})
		}
	}
}