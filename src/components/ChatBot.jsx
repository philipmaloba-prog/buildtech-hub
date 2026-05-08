import React, { useEffect, useRef, useState } from "react";

const ChatBot = ({ products = [] }) => {

    const [open, setOpen] = useState(false);

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
        {
            text: "Hi 👋 Welcome to BuildTech Hub 🏗️. Ask me about products, categories, descriptions or prices.",
            sender: "bot"
        }
    ]);

    const chatRef = useRef(null);

    // AUTO SCROLL
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    // SEND MESSAGE
    const sendMessage = () => {

        if (!input.trim()) return;

        const text = input.toLowerCase().trim();

        const userMsg = {
            text: input,
            sender: "user"
        };

        let botReply = "";

        // GREETINGS
        if (
            text.includes("hi") ||
            text.includes("hello") ||
            text.includes("hey")
        ) {

            botReply =
                "👋 Hello! Welcome to BuildTech Hub 🏗️. Ask me about building materials, tools, categories or prices.";

        } 
        
        // PRICE QUESTIONS
        else if (
            text.includes("price") ||
            text.includes("cost") ||
            text.includes("how much")
        ) {

            botReply =
                "💰 Search any product name like cement, ladder, steel or tools to see prices.";

        }

        // PRODUCT SEARCH
        else {

            const foundProducts = products.filter((p) => {

                const name =
                    (p.product_name || p.name || "")
                        .toLowerCase();

                const description =
                    (p.product_description || p.description || "")
                        .toLowerCase();

                const category =
                    (p.category || "")
                        .toLowerCase();

                return (
                    name.includes(text) ||
                    description.includes(text) ||
                    category.includes(text)
                );
            });

            // IF PRODUCTS FOUND
            if (foundProducts.length > 0) {

                botReply = foundProducts
                    .slice(0, 5)
                    .map((p) => `
📦 ${p.product_name || p.name}

📝 ${p.product_description || p.description || "No description available"}

💰 KSh ${p.product_cost || p.price}

📂 Category: ${p.category || "General"}
                    `)
                    .join("\n\n");

            } 
            
            // NO PRODUCTS FOUND
            else {

                botReply =
                    "🤖 Sorry, I couldn't find that product. Try searching by product name, category or description.";

            }
        }

        // UPDATE CHAT
        setMessages((prev) => [
            ...prev,
            userMsg,
            {
                text: botReply,
                sender: "bot"
            }
        ]);

        setInput("");
    };

    return (
        <>
            {/* FLOATING CHAT BUTTON */}
            <button
                className="chat-toggle"
                onClick={() => setOpen(!open)}
            >
                💬
            </button>

            {/* CHAT WINDOW */}
            {open && (
                <div className="chatbot-container">

                    {/* HEADER */}
                    <div className="chat-header">

                        <span>
                            BuildTech Assistant 🏗️
                        </span>

                        <button
                            onClick={() => setOpen(false)}
                        >
                            ✖
                        </button>

                    </div>

                    {/* MESSAGES */}
                    <div
                        className="chatbox"
                        ref={chatRef}
                    >

                        {messages.map((msg, i) => (

                            <div
                                key={i}
                                className={`msg ${msg.sender}`}
                            >
                                {msg.text}
                            </div>

                        ))}

                    </div>

                    {/* INPUT */}
                    <div className="chat-input">

                        <input
                            type="text"
                            placeholder="Ask about materials..."
                            value={input}
                            onChange={(e) =>
                                setInput(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                        />

                        <button onClick={sendMessage}>
                            Send
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};

export default ChatBot;