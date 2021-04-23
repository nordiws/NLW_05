import { http } from "./http"
import dotenv from "dotenv"
import "./websocket/client"

dotenv.config();
const PORT = process.env.PORT;

http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));