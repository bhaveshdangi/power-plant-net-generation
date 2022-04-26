import lowdb from "lowdb";
import {default as FileAsync} from "lowdb/adapters/FileAsync";
import {NetGeneration} from "../models/NetGeneration";
import * as Excel from "exceljs";
import {Plant} from "../models/Plant";

type Data = {
    netGenerations: NetGeneration[]
}

export class DbService {

    private static instance: DbService;
    private db?: lowdb.LowdbAsync<Data>;

    constructor() {
        this.initDatabase();
    }

    static getInstance(): DbService {
        if (!DbService.instance) {
            DbService.instance = new DbService();
        }
        return DbService.instance;
    }

    private initDatabase() {
        const adapter = new FileAsync("db.json");
        lowdb(adapter).then(value => {
            this.db = value;
            this.dumpData();
            console.log("Database Initialized.....")
        });

    }

    public getNetGenerations() {

        return this.db?.get('netGenerations')
    }

    private dumpData() {
        let data = new Map<String, NetGeneration>();
        let netGenerationCells = ['DE', 'DF', 'DG', 'DH', 'DI', 'DJ', 'DK', 'DL', 'DM', 'DN', 'DO'];

        const workbook = new Excel.Workbook();

        workbook.xlsx.readFile('./resources/egrid2020_data.xlsx')
            .then(() => {
                const worksheet = workbook.getWorksheet("PLNT20");
                worksheet.eachRow(function (row, rowNumber) {

                    if (rowNumber > 2) {

                        let state = String(row.getCell(3).value);
                        let netGeneration = data.get(state);
                        if (netGeneration == null) {
                            netGeneration = new NetGeneration();
                            netGeneration.state = state;
                        }
                        let netGenerationValue = 0;
                        netGenerationCells.forEach(cell => {
                            netGenerationValue += row.getCell(cell).value != null ? Number(row.getCell(cell).value) : 0;
                        });
                        netGenerationCells.forEach(cell => {
                            netGenerationValue += row.getCell(cell).value != null ? Number(row.getCell(cell).value) : 0;
                        });
                        let percent = row.getCell('EJ').value != null ? (Number(row.getCell('EJ').value) * 100).toFixed(2) + '%'  : '0%';
                        netGeneration.plants?.push(new Plant(String(row.getCell(4).value),
                            Number(netGenerationValue.toFixed(2)), percent, Number(row.getCell('T')), Number(row.getCell('U'))));
                        data.set(state, netGeneration);
                    }
                });
                data.forEach(function (value, key) {

                    if (value.plants != undefined) {
                        value.plants.sort((a, b) => b.netGeneration - a.netGeneration)
                        value.plants = value.plants.slice(0, 5);
                    }
                });
                this.db?.set("netGenerations", [...data.values()]).write();
            });
    }
}
