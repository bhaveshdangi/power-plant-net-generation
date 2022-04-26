export class Plant {

    name: string
    netGeneration: number
    percentage: String
    latitude: number
    longitude: number

    constructor(name: string, netGeneration: number, percentage: String, latitude: number, longitude: number) {
        this.name = name;
        this.netGeneration = netGeneration;
        this.percentage = percentage;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public toString = (): string => {
        return `Plant (name: ${this.name})`;
    }
}