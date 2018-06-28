var Tx = require('../../models/tx');
var { index } = require('../../lib/settings');

exports.getLastTransactions = (min, pageIndex, pageSize)=>{
    //let count = index.last_txs;
    min = min * 100000000;
    //return Tx.find({'total': {$gt: min}}).sort({_id: 'desc'}).limit(count).exec();
    return new Promise((resolve,reject)=>{
        Tx
        .find({
            total: {
                $gt: min
            }
        })
        .sort({_id: 'desc'})
        .skip((pageSize * pageIndex) - pageSize)
        .limit(pageSize)
        .exec(function(err, items) {
            if(err) reject(err);
            else resolve(items);
        });
    });    
};

exports.getLastTransactionsCount = (min)=>{
    min = min * 100000000;
    return new Promise((resolve,reject)=>{
        Tx.count({
            total: {
                $gt: min
            }
        }).exec(function(err, count) {
            if(err) reject(err);
            else resolve(count);
        });
    });
};

exports.findOne = (txnId)=>{
    return new Promise((resolve,reject)=>{
        Tx.findOne({ txid: txnId }, (err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

exports.findByTxnIds = (txnIds)=>{
    return new Promise((resolve,reject)=>{
        Tx.find({ txid: {
            $in : txnIds
        }}, (err,data)=>{
            if(err) reject(err);
            else resolve(data);
        });
    });
}

exports.save = (model)=>{
    return new Promise((resolve,reject)=>{
        let tx = new Tx(model);
        tx.save(function(err) {
            if (err) reject(err);
            else resolve(tx);
        });
    });  
};