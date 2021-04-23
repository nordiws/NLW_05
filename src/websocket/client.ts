import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService"
import { MessagesService } from "../services/MessagesService";
import { UsersService } from "../services/UsersService";

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesServices = new MessagesService();

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;
        let user_id = null

        const userExist = await usersService.findByEmail(email);
        if (!userExist) {
            const user = await usersService.create(email);
            await connectionsService.create({
                socket_id,
                user_id: user.id
            });
            user_id = user.id;
        } else {
            user_id = userExist.id;
            const connection = await connectionsService.findByUserId(userExist.id);
            if (!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id: userExist.id
                })
            } else {
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }
        }
        // Salvar a conexão com o socket_id, user_id, 
        await messagesServices.create({
            text,
            user_id
        })
    })
});