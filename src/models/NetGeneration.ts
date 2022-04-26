import {Plant} from "./Plant";

export class NetGeneration {

    state?: string;
    plants?: Plant[] = [];

    constructor();

    constructor(state?: string, plants?: Plant[]) {
        if (state)
            this.state = state;
        if (plants)
            this.plants = plants;
    }

    public toString = (): string => {
        return `NetGeneration (state: ${this.state}) (plants: ${this.plants})`;
    }
}