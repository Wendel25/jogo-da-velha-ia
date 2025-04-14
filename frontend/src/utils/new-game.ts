import axios from "axios";

export const newGame = async (): Promise<{message: string}> => {
    const response = await axios.post("http://localhost:3000/new-game");
    return response.data;
};
