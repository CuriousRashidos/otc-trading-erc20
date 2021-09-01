var Airtable = require("airtable");
const credentials = require("./credentials");

var base = new Airtable({ apiKey: credentials.PRIVATE_KEY }).base(
  credentials.BASE
);
export const getContractAddresses = async () => {
  let result = [];
  base("Table 1")
    .select({
      view: "Grid view",
    })
    .firstPage(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        result.push(record.get("address"));
      });
      console.log(result);
      return result;
    });
};
