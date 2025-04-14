import axios from "axios";

interface ReturnPlay {
    board?: (string | null)[];
    result?: string
}

export const handleClickService = async (posicao: number): Promise<ReturnPlay> => {
    const response = await axios.post("http://localhost:3000/play", { posicao });
    return response.data;
};
