import { Request, Response } from "express"
import { UsersService } from "../services/UsersService"

class UsersController {
    async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        const usersServices = new UsersService();
        try {
            const user = await usersServices.create(email);
            return res.json(user)
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }

    }
}

export { UsersController }