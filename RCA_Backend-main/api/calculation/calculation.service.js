// const Calculation = require("./calculation.model");
var MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config')
var url = 'mongodb+srv://'+ config.mogno.MONGO_USERNAME +':'+ config.mogno.MONGO_PASSWORD +'@' + config.mogno.MONGO_HOST + '/' + config.mogno.MONGO_DBNAME;
const ObjectId = require('mongodb').ObjectId; 
const { calculationMessage } = require("../../config/actionMessage");
const customLogger = require("../../shared/helpers/customLogger");

exports.list = async () => {
    try {
        const client = new MongoClient(url, {useUnifiedTopology: true});
        await client.connect();
        const locationData = client.db("RCA").collection("BCIS_TPS_Results");
        const asset_class = client.db("RCA").collection("assetclass");
        const Demolition_Type = client.db("RCA").collection("Demolition_Type");

        const locationData_result = await locationData.find({}).toArray();
        const asset_class_result = await asset_class.find({}).toArray();
        const Demolition_Type_result = await Demolition_Type.find({}).toArray();
        
        return { success: true, message: calculationMessage.calculationList, locationData_result, asset_class_result, Demolition_Type_result };
    } catch (error) {
      customLogger.error("error api/calculation/calculation.service.js  List ==>", error);
      return {
        success: false,
        message: calculationMessage.calculationListError,
        data: error.message,
      };
    }
  };



exports.Exists = async (id) => {
    try {
        const client = new MongoClient(url, {useUnifiedTopology: true});
        await client.connect();
        var good_id = new ObjectId(id);
        const asset_class = client.db("RCA").collection("BCIS_Average_Prices");
        const asset_class_result = await asset_class.find({assetClass_id: good_id}).toArray();
        if(!asset_class_result) {
            return { success: false, message : calculationMessage.assetclassNotfound, data: null }
        }else{
            return { success: true, message: calculationMessage.assetClassList, asset_class_result };
        }

    } catch (error) {
      customLogger.error("error api/calculation/calculation.service.js  BCIS Exist ==>", error);
      return {
        success: false,
        message: calculationMessage.assetclassError,
        data: error.message,
      };
    }
  };

  
exports.DemolitionExists = async (id) => {
  try {
      const client = new MongoClient(url, {useUnifiedTopology: true});
      await client.connect();
      var good_id = new ObjectId(id);
      const asset_class = client.db("RCA").collection("Demolition_Rate");
      const Demolition_Rate_result = await asset_class.find({demolitionType_id: good_id}).toArray();
      if(!Demolition_Rate_result) {
          return {success: false, message: calculationMessage.assetclassNotfound, data: null}
      }else{
          return { success: true, message: calculationMessage.demolitionList, Demolition_Rate_result };
      }

  } catch (error) {
    customLogger.error("error api/calculation/calculation.service.js  Demolition Exist ==>", error);
    return {
      success: false,
      message: calculationMessage.demolitionerror,
      data: error.message,
    };
  }
};