import {useState} from 'react';
import "./Chatbot.css";

function Chatbot() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);

    const answer = [
        {
            keywords: ["special", "today"],
            answer: "Today's special is Chicken Alfredo for $18.99."
        },
        {
            keywords: ["vegetarian", "vegetable"],
            answer: "We offer Vegetable Pasta, Margherita Pizza, and Garden Salad."
        },
        {
            keywords: ["recommend", "recommendation"],
            answer: "Based on popular orders, we recommend our Chicken Alfredo."
        },
        {
            keywords: ["gluten"],
            answer: "Yes. We offer gluten-free pasta and selected salads."
        },
        {
            keywords: ["dessert", "chocolate", "popular"],
            answer: "Our Chocolate Lava Cake is our most popular dessert."
        },
        {
            keywords: ["last time", "previous order", "ordered"],
            answer: "Your previous order was Chicken Alfredo and Chocolate Lava Cake."
        }
    ];

    function sendMessage(event) {
        event.prevemtDefault();

        if (question.trim() === "")
            return;

        const userQuestion = question.toLowerCase();

        const foundAnswer = answers.find(item =>
            item.keywords.some(word => userQuestion.includes(word))
        );

        const reply = foundAnswer ? foundAnswer.answer
            : "Sorry, I don't know that yet. Try asking about specials, vegetarian meals, recommendations, gluten-free options, or desserts.";
        
        setMessages([
            ...messages,
            { text: question, sender: "You" },
            { text: reply, sender: "AI" }
        ]);
        setQuestion("");

        return (
            <div className="chatbot">
                <h2>Restaurant AI Assistant 🤖</h2>
                <p>Ask me about our menu!</p>

                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <p key={index}>
                            <strong>{message.sender}:</strong> {message.text}
                        </p>
                    ))}
                </div>

                <form onSubmit={sendMessage}>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask a question..."
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default Chatbot;