import {DbService} from "./DBService";

class NetGenerationService {

    public getNetGenerations(state: String) {

        let statesNetGenerations = DbService.getInstance().getNetGenerations();
        if (statesNetGenerations) {
            return statesNetGenerations.find(n => n.state == state);
        }
        return {};
    }

    public getStates() {

        let statesNetGenerations = DbService.getInstance().getNetGenerations();
        if (statesNetGenerations) {
            return statesNetGenerations.map(n => n.state);
        }
        return [];
    }
}

export default new NetGenerationService();
