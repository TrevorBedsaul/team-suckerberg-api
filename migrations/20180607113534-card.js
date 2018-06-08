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
  db.createTable('card', {
    id: {
      type: 'int',
      primaryKey: true
    },
    name: {
      type: 'string',
      length: 50
    },
    number: {
      type: 'string',
      length: 16
    },
    expiry_day: {
      type: 'string',
      length: 2
    },
    expiry_month: {
      type: 'string',
      length: 2
    },
    secure_code: {
      type: 'string',
      length: 3
    },
  }, callback);
  return null;
};

exports.down = function (db, callback) {
  db.dropTable('card');
  return null;
};

exports._meta = {
  "version": 1
};
