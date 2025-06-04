export function normalizeText(text: string): string {
    if (!text) return "";
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

export function getMonthFromText(text: string): number | null {
    const months: Record<string, number> = {
        'janeiro': 1, 'fevereiro': 2, 'março': 3, 'marco': 3,
        'abril': 4, 'maio': 5, 'junho': 6, 'julho': 7,
        'agosto': 8, 'setembro': 9, 'outubro': 10,
        'novembro': 11, 'dezembro': 12
    };
    
    const normalizedText = normalizeText(text);
    for (const [month, number] of Object.entries(months)) {
        if (normalizedText.includes(month)) {
            return number;
        }
    }
    return null;
}

export function getMonthName(monthNumber: number): string {
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthNumber - 1];
}

export function getRandomResponse<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function isGreeting(normalizedMessage: string): boolean {
    const greetings = ['ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'hi', 'hello'];
    return greetings.some(greeting => normalizedMessage.includes(greeting));
}

export function isThanks(normalizedMessage: string): boolean {
    const thanks = ['obrigado', 'obrigada', 'thanks', 'thank you', 'valeu'];
    return thanks.some(thank => normalizedMessage.includes(thank));
}

export const welcomeMessages = [
    "Olá! Bem-vindo ao assistente de documentos. Como posso ajudar?",
    "Olá! Estou aqui para ajudar com a recuperação de documentos. O que precisa?",
    "Bem-vindo! Posso ajudar a encontrar faturas ou guias de transporte. Como posso ajudar?"
];

export const greetingResponses = [
    "Olá! Como posso ajudar?",
    "Oi! Em que posso ser útil?",
    "Olá! Estou aqui para ajudar com documentos. O que precisa?"
];

export const thanksResponses = [
    "De nada! Estou sempre à disposição.",
    "Por nada! Se precisar de mais alguma coisa, é só chamar.",
    "Disponha! Estou aqui para ajudar."
]; 