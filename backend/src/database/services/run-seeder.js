const csv = require("fast-csv");

module.exports = {
    seedFromCsv: async function (q, table, file, map) {
        const chunk = [];
        let createdCount = 0;
        return new Promise(function (fulfill, reject) {
            csv.parseFile(file).on("data", async function (data) {
                const result = map(data);
                chunk.push({ ...result });
                if (chunk.length >= 5000) {
                    createdCount += chunk.length;
                    console.log(`In Table ${table} : ${chunk.length} rows inserted | total ${createdCount} rows created!`);
                    bulkInsert(q, table, chunk);
                    chunk.length = 0;
                }
            }).on("error", function (_err) {
                reject(_err);
            }).on("end", async function (_res) {
                bulkInsert(q, table, chunk);
                chunk.length = 0;
                fulfill(_res);
            });
        });

        async function bulkInsert(q, table, chunk) {
            if (chunk && chunk.length > 0) {
                const f = function (_e) {
                    console.log(_e);
                };
                await q.bulkInsert(table, chunk, { ignoreDuplicates: true }).catch(f);
            }
        }
    }
};
