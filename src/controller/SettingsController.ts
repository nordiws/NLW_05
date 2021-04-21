import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

class SettingsController {
    async create(req: Request, res: Response) {
        try {
            const { chat, username } = req.body;
            const settingsRepository = getCustomRepository(SettingsRepository);
            const settings = settingsRepository.create({
                chat,
                username
            })
            await settingsRepository.save(settings);
            return res.json(settings);

        } catch (error) {
            res.status(400).send("Error on database access -- " + error)
        }
    }
}

export { SettingsController }