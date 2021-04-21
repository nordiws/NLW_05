import { Request, Response } from "express"
import { MessagesService } from "../services/MessagesService"


class MessagesController {
    async create(req: Request, res: Response) {
        const { admin_id, text, user_id } = req.body;
        const messagesServices = new MessagesService();

        try {
            const message = await messagesServices.create({
                admin_id,
                text,
                user_id
            })
            return res.json(message);
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    // localhost:3000/messages/idDoUsuario
    async showByUser(req: Request, res: Response) {
        const { id } = req.params;
        const messagesServices = new MessagesService();
        const list = await messagesServices.listByUser(id);
        return res.json(list);
    }
}

export { MessagesController }