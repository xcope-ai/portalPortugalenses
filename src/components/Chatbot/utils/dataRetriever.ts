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

interface SearchResult {
    success: boolean;
    error?: string;
    message?: string;
    documents?: Document[];
    vehicles?: Vehicle[];
    drivers?: Driver[];
    count?: number;
}

export class DataRetriever {
    private documentTypes: Record<string, string[]>;
    private vehicleTypes: Record<string, string[]>;
    private documents: Document[];
    private vehicles: Vehicle[];
    private drivers: Driver[];

    constructor() {
        this.documentTypes = {
            "service_order": ["ordem", "ordens", "serviço", "serviços", "service", "services", "order", "orders"]
        };

        this.vehicleTypes = {
            "truck": ["camião", "camiões", "truck", "trucks"],
            "van": ["van", "vans", "furgão", "furgões"]
        };
        
        // Import all data
        this.documents = require('@/data/documents.json').documents;
        this.vehicles = require('@/data/vehicles.json').vehicles;
        this.drivers = require('@/data/drivers.json').drivers;
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

    public identifyVehicleType(query: string): string | null {
        const normalizedQuery = this.normalizeText(query);
        
        for (const [vehicleType, variations] of Object.entries(this.vehicleTypes)) {
            for (const variation of variations) {
                if (normalizedQuery.includes(this.normalizeText(variation))) {
                    return vehicleType;
                }
            }
        }
        
        return null;
    }

    public identifyQueryType(query: string): string[] {
        const types: string[] = [];
        const normalizedQuery = this.normalizeText(query);

        // Check for document related queries
        if (normalizedQuery.includes("documento") || 
            normalizedQuery.includes("documentos") || 
            normalizedQuery.includes("ordem") || 
            normalizedQuery.includes("ordens")) {
            types.push("documents");
        }

        // Check for vehicle related queries
        if (normalizedQuery.includes("veículo") || 
            normalizedQuery.includes("veículos") || 
            normalizedQuery.includes("camião") || 
            normalizedQuery.includes("camiões") || 
            normalizedQuery.includes("van") || 
            normalizedQuery.includes("vans")) {
            types.push("vehicles");
        }

        // Check for driver related queries
        if (normalizedQuery.includes("motorista") || 
            normalizedQuery.includes("motoristas") || 
            normalizedQuery.includes("condutor") || 
            normalizedQuery.includes("condutores")) {
            types.push("drivers");
        }

        return types;
    }

    public async searchData(clientId: string, queryTypes: string[], documentType?: string, vehicleType?: string): Promise<SearchResult> {
        try {
            if (!clientId || !clientId.match(/^CLI\d{3,}$/)) {
                return {
                    success: false,
                    error: "formato_cliente_invalido",
                    message: "Formato do número de cliente incorreto. Por favor, use o formato CLIXXX (ex: CLI001)."
                };
            }

            const result: SearchResult = {
                success: true,
                documents: [],
                vehicles: [],
                drivers: []
            };

            if (queryTypes.includes("documents")) {
                let filteredDocs = this.documents.filter(doc => doc.clientId === clientId);
                if (documentType) {
                    filteredDocs = filteredDocs.filter(doc => doc.type === documentType);
                }
                result.documents = filteredDocs;
            }

            if (queryTypes.includes("vehicles")) {
                let filteredVehicles = this.vehicles.filter(vehicle => vehicle.clientId === clientId);
                if (vehicleType) {
                    filteredVehicles = filteredVehicles.filter(vehicle => vehicle.type === vehicleType);
                }
                result.vehicles = filteredVehicles;
            }

            if (queryTypes.includes("drivers")) {
                result.drivers = this.drivers.filter(driver => driver.clientId === clientId);
            }

            // Check if any data was found
            const totalCount = (result.documents?.length || 0) + 
                             (result.vehicles?.length || 0) + 
                             (result.drivers?.length || 0);

            if (totalCount === 0) {
                return {
                    success: false,
                    error: "dados_nao_encontrados",
                    message: `Não foram encontrados dados para o cliente ${clientId}.`
                };
            }

            result.count = totalCount;
            return result;
        } catch (error) {
            console.error("Error searching data:", error);
            return {
                success: false,
                error: "erro_interno",
                message: "Ocorreu um erro ao procurar os dados. Por favor, tente novamente."
            };
        }
    }

    public async processQuery(query: string): Promise<SearchResult> {
        const clientId = this.extractClientNumber(query);
        const documentType = this.identifyDocumentType(query);
        const vehicleType = this.identifyVehicleType(query);
        const queryTypes = this.identifyQueryType(query);

        if (!clientId) {
            return {
                success: false,
                error: "cliente_nao_especificado",
                message: "Por favor, especifique o número do cliente (ex: CLI001)."
            };
        }

        if (queryTypes.length === 0) {
            return {
                success: false,
                error: "tipo_consulta_nao_especificado",
                message: "Por favor, especifique o tipo de informação que deseja (documentos, veículos ou motoristas)."
            };
        }

        return this.searchData(
            clientId, 
            queryTypes, 
            documentType || undefined, 
            vehicleType || undefined
        );
    }
} 