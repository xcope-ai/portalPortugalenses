'use client';

import React from 'react';
import { Chatbot } from '@/components/Chatbot';
import DefaultLayout from '@/layouts/DefaultLayout';
import PageContainer from '@/components/PageContainer/PageContainer';
import styles from './page.module.css';

export default function ChatbotPage() {
    return (
        <DefaultLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Quinas</h1>
                    <p>Encontre rapidamente faturas, guias de transporte e outros documentos</p>
                </div>
                <div className={styles.chatContainer}>
                    <Chatbot fullScreen />
                </div>
            </div>
        </DefaultLayout>
    );
} 