import axios from "axios";
import { routerBackend } from "../consts/router-backend";

interface NewGameResponse {
    message: string;
    board: (string | null)[];
    starter: "X" | "O";
}

export const newGame = async (): Promise<NewGameResponse> => {
    const response = await axios.post(`${routerBackend}/new-game`);
    return response.data;
};
