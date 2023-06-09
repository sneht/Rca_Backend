const Summary = require("./summary.model");
const { summary, dashboardMessage } = require("../../config/actionMessage");
const customLogger = require("../../shared/helpers/customLogger");

const ObjectId = require('mongodb').ObjectId;

exports.Exists = async (id) => {
  try {
    var good_id = new ObjectId(id);  

    const summmarydata = await Summary.aggregate([
      {
        $project: {
          user_id: 1,
          location: 1,
          asset_class: 1,
          option_1: {$toObjectId: '$option_1'},
          area: 1,
          BCIS_average_prices: 1,
          type:1,
          Aaset_type: 1
        }
      },
      {
        $lookup: {
         from: 'BCIS_TPS_Results',
         localField: 'location',
         foreignField: '_id',
         as: 'location'
        }
      },
      { 
        $unwind: '$location'
      },
      {
        $lookup: {
         from: 'BCIS_Average_Prices',
         localField: 'asset_class',
         foreignField: 'assetClass_id',
         as: 'asset_class'
        }
      },
      { 
        $unwind: '$asset_class'
      },
      {
        $lookup: {
         from: 'BCIS_Average_Prices',
         localField: 'option_1',
         foreignField: '_id',
         as: 'option_1'
        }
      },
      { 
        $unwind: '$option_1'
      },
      {
        $lookup: {
         from: 'Demolition_Type',
         localField: 'type',
         foreignField: '_id',
         as: 'type'
        }
      },
      { 
        $unwind: '$type'
      },
      {
        $lookup: {
         from: 'Demolition_Rate',
         localField: 'Aaset_type',
         foreignField: '_id',
         as: 'Aaset_type'
        }
      },
      { 
        $unwind: '$Aaset_type'
      },
      { $match : { user_id : good_id } }
    

      ],
      
    )

    if(summmarydata !== null) {
      return { success: true, message: dashboardMessage.dashboardDetail, data: summmarydata };
    } else {
      return { success: false, message: dashboardMessage.dashboardError, data: null };
    }
  } catch (error) {
    customLogger.error("error api/Summary/Summary.service.js  Exist ==>", error);
    return {
      success: false,
      message: "ERROR_FETCH_SUMMARY_DETAILS",
      data: error.message,
    };
  }
};

exports.create = async (data) => {
  try {
    const datum = new Summary(data);
    const result = await datum.save();
    return {
      success: true,
      message: summary.summaryCreate,
      data: result,
    };
    
  } catch (error) {
    customLogger.error("error api/summary/summary.service.js  Create ==>", error);
    return {
      success: false,
      message: "ERROR_ADDING_SUMMARY_DETAILS",
      data: error.message,
    };
  }
};

