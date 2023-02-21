//const sheetId = '1F0zETpb3Y8dDhzBEo-iib-VDTPS825RBXmXjhxtU1xw';  // DEV
const sheetId = '1F0zETpb3Y8dDhzBEo-iib-VDTPS825RBXmXjhxtU1xw';  // PROD
const sheetName = 'Sheet1';

const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;

export function fetchGoogleSpreadSheetData() {
    return new Promise((resolve) => {
        executeTask(async () => {
            try {
                // Prepared query
                const query = encodeURIComponent('Select *')
                const googleUrl = `${base}&sheet=${sheetName}&tq=${query}`
                let spreadSheetData: any = []

                fetch(googleUrl)
                    .then(res => res.text())
                    .then(rep => {
                        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
                        let headerRow: any = jsonData.table.rows[0].c;
                        for (let i = 1; i < jsonData.table.rows.length; i++) {
                            let rowData: any = {}
                            for (let j = 0; j < headerRow.length; j++) {
                                rowData[headerRow[j].v] = jsonData.table.rows[i].c[j].v;
                            }
                            spreadSheetData.push(rowData);
                        }
                        resolve(spreadSheetData)
                    })
            } catch {
                log('Fetch Google Spread Sheet Data :: Error ::', error)
            }
        }).catch((error) => log(error))
    })
}

