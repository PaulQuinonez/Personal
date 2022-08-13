import { config } from "dotenv";
import {Server} from './server';

config();
const servidor = new Server();
servidor.listen();
