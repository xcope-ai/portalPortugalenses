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

interface SearchResult {
    success: boolean;
    error?: string;
    message?: string;
    documents?: Document[];
    count?: number;
}

export class DocumentRetriever {
    private documentTypes: Record<string, string[]>;
    private documents: Document[];

    constructor() {
        this.documentTypes = {
            "service_order": ["ordem", "ordens", "serviço", "serviços", "service", "services", "order", "orders"]
        };
        
        // Import documents data
        this.documents = require('@/data/documents.json').documents;
    }

    private normalizeText(text: string): string {
        if (!text) return "";
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    public extractClientNumber(query: string): string | null {
        const normalizedQuery = this.normalizeText(query);
        const clientNumberRegex = /cli(\d{3,})/g;
        const matches = normalizedQuery.match(clientNumberRegex);
        
        if (matches && matches.length > 0) {
            return matches[0].toUpperCase();
        }
        
        return null;
    }

    public identifyDocumentType(query: string): string | null {
        const normalizedQuery = this.normalizeText(query);
        
        for (const [docType, variations] of Object.entries(this.documentTypes)) {
            for (const variation of variations) {
                if (normalizedQuery.includes(this.normalizeText(variation))) {
                    return docType;
                }
            }
        }
        
        return null;
    }

    public async searchDocuments(clientId: string, documentType?: string): Promise<SearchResult> {
        try {
            if (!clientId || !clientId.match(/^CLI\d{3,}$/)) {
                return {
                    success: false,
                    error: "formato_cliente_invalido",
                    message: "Formato do número de cliente incorreto. Por favor, use o formato CLIXXX (ex: CLI001)."
                };
            }
            
            let filteredDocuments = this.documents.filter(doc => doc.clientId === clientId);
            
            if (documentType) {
                filteredDocuments = filteredDocuments.filter(doc => doc.type === documentType);
            }
            
            if (filteredDocuments.length === 0) {
                let errorMessage = `Não foram encontrados documentos para o cliente ${clientId}`;
                if (documentType) {
                    errorMessage += ` do tipo ${documentType}`;
                }
                errorMessage += ".";
                
                return {
                    success: false,
                    error: "documentos_nao_encontrados",
                    message: errorMessage
                };
            }
            
            return {
                success: true,
                documents: filteredDocuments,
                count: filteredDocuments.length
            };
        } catch (error) {
            console.error("Error searching documents:", error);
            return {
                success: false,
                error: "erro_interno",
                message: "Ocorreu um erro ao procurar os documentos. Por favor, tente novamente."
            };
        }
    }

    public async processQuery(query: string): Promise<SearchResult> {
        const clientId = this.extractClientNumber(query);
        const documentType = this.identifyDocumentType(query);

        if (!clientId) {
            return {
                success: false,
                error: "cliente_nao_especificado",
                message: "Por favor, especifique o número do cliente (ex: CLI001)."
            };
        }

        return this.searchDocuments(clientId, documentType || undefined);
    }
} 