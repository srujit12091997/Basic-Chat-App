// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const typingIndicator = document.getElementById('typingIndicator');

// Store messages
let messages = [];

// Bot responses
const botResponses = [
    "That's interesting! Tell me more.",
    "I see what you mean. How about we discuss that further?",
    "Great point! I hadn't thought about it that way.",
    "Thanks for sharing your perspective!",
    "I completely understand what you're saying.",
    "That's a fascinating insight!",
    "I appreciate you sharing that with me.",
    "Let's explore that idea further.",
    "You make a compelling argument.",
    "That's a unique way of looking at it!"
];

// Event Listeners
messageInput.addEventListener('keypress', handleKeyPress);
messageInput.addEventListener('input', handleTyping);
sendButton.addEventListener('click', sendMessage);

// Handle Enter key press
function handleKeyPress(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

// Typing indicator logic
let typingTimeout;
function handleTyping() {
    clearTimeout(typingTimeout);
    typingIndicator.style.display = 'block';
    
    typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
    }, 1000);
}

// Send message function
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
        // Add sent message
        addMessage(messageText, 'sent');
        messageInput.value = '';

        // Simulate bot thinking and typing
        typingIndicator.style.display = 'block';
        
        // Random response time between 1-2 seconds
        const responseTime = 1000 + Math.random() * 1000;

        // Simulate received message after a delay
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(randomResponse, 'received');
        }, responseTime);
    }
}

// Add message to chat
function addMessage(text, type) {
    const message = {
        text,
        type,
        time: new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
        })
    };
    messages.push(message);

    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.innerHTML = `
        ${text}
        <div class="message-time">${message.time}</div>
    `;

    chatMessages.appendChild(messageElement);
    scrollToBottom();
}

// Scroll to bottom of messages
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize chat with welcome messages
function initChat() {
    addMessage("👋 Welcome to Modern Chat!", "received");
    addMessage("This space is designed for meaningful conversations. Feel free to start chatting!", "received");
}

// Start the chat
initChat();