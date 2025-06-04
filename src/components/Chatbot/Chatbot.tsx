'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Chatbot.module.css';
import { DataRetriever } from './utils/dataRetriever';
import {
    normalizeText,
    getMonthFromText,
    getMonthName,
    getRandomResponse,
    isGreeting,
    isThanks,
    welcomeMessages,
    greetingResponses,
    thanksResponses
} from './utils/chatUtils';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    html?: boolean;
}

interface ChatbotProps {
    fullScreen?: boolean;
}

interface Document {
    id: string;
    type: string;
    title: string;
    clientId: string;
    vehicleId: string;
    driverId: string;
    date: string;
    status: string;
    amount: number;
}

interface Vehicle {
    id: string;
    plate: string;
    type: string;
    model: string;
    year: number;
    capacity: string;
    status: string;
    clientId: string;
    lastMaintenance: string;
    nextMaintenance: string;
}

interface Driver {
    id: string;
    name: string;
    license: string;
    licenseNumber: string;
    licenseExpiry: string;
    status: string;
    clientId: string;
    vehicleId: string;
    phone: string;
    email: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({ fullScreen = false }) => {
    const [isOpen, setIsOpen] = useState(fullScreen);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dataRetriever = useRef(new DataRetriever());
    const welcomeShown = useRef(false);
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen && !welcomeShown.current) {
            showWelcomeMessage();
            welcomeShown.current = true;
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const showWelcomeMessage = () => {
        const welcomeMessage = getRandomResponse(welcomeMessages);
        addMessage(welcomeMessage, 'bot');
        // Pre-fill the input box with the predefined message
        setInputValue("Quero os documentos de março do Cliente CLI003");
    };

    const addMessage = (text: string, sender: 'user' | 'bot', html: boolean = false) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            text,
            sender,
            timestamp: new Date(),
            html
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const message = inputValue.trim();
        setInputValue('');
        addMessage(message, 'user');

        await processUserMessage(message);
    };

    const processUserMessage = async (message: string) => {
        if (!message.trim()) return;

        setIsTyping(true);

        try {
            const result = await dataRetriever.current?.processQuery(message);

            if (!result?.success) {
                addMessage(result?.message || 'Desculpe, não consegui processar sua solicitação.', 'bot');
                return;
            }

            const clientId = result.documents?.[0]?.clientId || 
                           result.vehicles?.[0]?.clientId || 
                           result.drivers?.[0]?.clientId;

            let responseHtml = `<p>Encontrei os seguintes dados para o cliente ${clientId}:</p>`;

            // Display documents
            if (result.documents && result.documents.length > 0) {
                responseHtml += `<h4>Documentos:</h4><ul>`;
                result.documents.forEach((doc: Document) => {
                    responseHtml += `
                        <li>
                            <a href="/documents/${doc.id}.pdf" target="_blank">
                                <strong>${doc.title}</strong>
                            </a><br>
                            Data: ${new Date(doc.date).toLocaleDateString()}<br>
                            Status: ${doc.status}<br>
                            Valor: €${doc.amount.toFixed(2)}<br>
                            ID: ${doc.id}
                        </li>`;
                });
                responseHtml += '</ul>';
            }

            // Display vehicles
            if (result.vehicles && result.vehicles.length > 0) {
                responseHtml += `<h4>Veículos:</h4><ul>`;
                result.vehicles.forEach((vehicle: Vehicle) => {
                    responseHtml += `
                        <li>
                            <strong>${vehicle.model}</strong><br>
                            Matrícula: ${vehicle.plate}<br>
                            Tipo: ${vehicle.type === 'truck' ? 'Camião' : 'Van'}<br>
                            Capacidade: ${vehicle.capacity}<br>
                            Status: ${vehicle.status}<br>
                            Última Manutenção: ${new Date(vehicle.lastMaintenance).toLocaleDateString()}<br>
                            Próxima Manutenção: ${new Date(vehicle.nextMaintenance).toLocaleDateString()}
                        </li>`;
                });
                responseHtml += '</ul>';
            }

            // Display drivers
            if (result.drivers && result.drivers.length > 0) {
                responseHtml += `<h4>Motoristas:</h4><ul>`;
                result.drivers.forEach((driver: Driver) => {
                    responseHtml += `
                        <li>
                            <strong>${driver.name}</strong><br>
                            Licença: ${driver.license} (${driver.licenseNumber})<br>
                            Expiração: ${new Date(driver.licenseExpiry).toLocaleDateString()}<br>
                            Status: ${driver.status}<br>
                            Telefone: ${driver.phone}<br>
                            Email: ${driver.email}
                        </li>`;
                });
                responseHtml += '</ul>';
            }

            addMessage(responseHtml, 'bot', true);
        } catch (error) {
            console.error('Error processing message:', error);
            addMessage('Desculpe, ocorreu um erro ao processar sua mensagem.', 'bot');
        } finally {
            setIsTyping(false);
        }
    };

    if (fullScreen) {
        return (
            <div className={styles.fullScreenContainer}>
                <div className={styles.messagesContainer}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.message} ${
                                message.sender === 'user' ? styles.userMessage : styles.botMessage
                            }`}
                        >
                            {message.html ? (
                                <div 
                                    className={styles.messageContent}
                                    dangerouslySetInnerHTML={{ __html: message.text }}
                                />
                            ) : (
                                <div className={styles.messageContent}>{message.text}</div>
                            )}
                            <div className={styles.messageTimestamp}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.message} ${styles.botMessage}`}>
                            <div className={styles.typingIndicator}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className={styles.inputForm}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className={styles.messageInput}
                    />
                    <button 
                        type="submit" 
                        className={styles.sendButton}
                        disabled={isTyping}
                    >
                        Send
                    </button>
                </form>
            </div>
        );
    }

    // Don't render the chatbot bubble on login page or dedicated chatbot page
    if (pathname === '/' || pathname === '/chatbot') {
        return null;
    }

    return (
        <div className={styles.chatbotContainer}>
            {!isOpen && (
                <button
                    className={styles.chatButton}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open chat"
                >
                    <span>💬</span>
                </button>
            )}

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <h3>Internal Assistant</h3>
                        <button
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            ×
                        </button>
                    </div>

                    <div className={styles.messagesContainer}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`${styles.message} ${
                                    message.sender === 'user' ? styles.userMessage : styles.botMessage
                                }`}
                            >
                                {message.html ? (
                                    <div 
                                        className={styles.messageContent}
                                        dangerouslySetInnerHTML={{ __html: message.text }}
                                    />
                                ) : (
                                    <div className={styles.messageContent}>{message.text}</div>
                                )}
                                <div className={styles.messageTimestamp}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className={`${styles.message} ${styles.botMessage}`}>
                                <div className={styles.typingIndicator}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className={styles.inputForm}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your message..."
                            className={styles.messageInput}
                        />
                        <button 
                            type="submit" 
                            className={styles.sendButton}
                            disabled={isTyping}
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}; 