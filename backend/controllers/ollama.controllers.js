import { askOllama } from "../helper/askOllama.js"
export const passwordStrengthCheck = async(req,res) => {
    try {
        const {password} = req.body;
        console.log(password)
        if (!password) return res.status(400).json({ message: "Password is required" });
        const prompt = `Analyze the strength of this password: "${password}". Provide a short advice on how to improve it.`;
        console.log("prompt sent to ollama")
        const response = await askOllama(prompt);
        console.log("got the response")
        return res.status(200).json({ advice: response });
    } catch (error) {
        console.log("Error checking password strength", error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}