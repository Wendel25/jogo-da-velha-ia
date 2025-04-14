import axios from "axios";
import { routerBackend } from "../consts/router-backend";

export const newGame = async (): Promise<{message: string}> => {
    const response = await axios.post(`${routerBackend}/new-game`);
    return response.data;
};
