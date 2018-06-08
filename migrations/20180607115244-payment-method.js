'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('payment-method', {
    id: {
      type: 'int',
      primaryKey: true
    },
    card_id: {
      type: 'int',
    },
    paypal_id: {
      type: 'int',
    },
    wire_id: {
      type: 'int',
    },
  }, callback);
  return null;
};

exports.down = function (db, callback) {
  db.dropTable('payment-method');
  return null;
};

exports._meta = {
  "version": 1
};
