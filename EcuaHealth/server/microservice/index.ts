import { config } from "dotenv";
import { Server } from './servidor';

config();
const servidor = new Server();
servidor.listen();