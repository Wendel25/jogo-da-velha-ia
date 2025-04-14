import axios from "axios";
import { routerBackend } from "../consts/router-backend";

interface ReturnPlay {
    board?: (string | null)[];
    result?: string
}

export const handleClickService = async (posicao: number): Promise<ReturnPlay> => {
    const response = await axios.post(`${routerBackend}/play`, { posicao });
    return response.data;
};
