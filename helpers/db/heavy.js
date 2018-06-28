var Heavy = require('../../models/heavy');
var { coin } = require('../../lib/settings');

exports.getHeavy = ()=>{
    return new Promise((resolve,reject)=>{
        Heavy.findOne({ coin }, (err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
};