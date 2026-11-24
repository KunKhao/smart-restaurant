import {useState} from 'react';
import "./Chatbot.css";

function Chatbot() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);

    const answers = [
        {
            keywords: ["special", "today"],
            answer: "Welcome! Today's Thai menu includes Pad Thai for $16.99, Green Curry for $17.99, and Mango Sticky Rice for $9.99."
        },
        {
            keywords: ["vegetarian", "vegetable"],
            answer: "Our vegetarian options are Som Tam ($12.99), Mango Sticky Rice ($9.99), and Thai Milk Tea ($5.99)."
        },
        {
            keywords: ["recommend", "recommendation"],
            answer: "We recommend Pad Thai ($16.99) if you enjoy noodles, or Green Curry ($17.99) if you like Thai curry!"
        },
        {
            keywords: ["gluten"],
            answer: "Sorry, we don't currently have confirmed gluten-free information for our menu. Please ask our restaurant staff about ingredients."
        },
        {
            keywords: ["dessert", "chocolate", "sweet"],
            answer: "Our dessert is Mango Sticky Rice ($9.99), made with sweet sticky rice, fresh mango, and coconut milk."
        },
        {
            keywords: ["soup", "spicy"],
            answer: "Try Tom Yum Goong ($14.99)! It is a spicy and sour shrimp soup with lemongrass."
        },
        {
            keywords: ["drink", "beverage", "tea"],
            answer: "We have Thai Milk Tea ($5.99), made with Thai tea, milk, and sugar."
        },
        {
            keywords: ["last time", "previous order", "ordered"],
            answer: "I cannot check your previous orders yet. Please visit your order history when that feature becomes available."
        }
    ];

    function sendMessage(event) {
        event.preventDefault();

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

    }
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


export default Chatbot;