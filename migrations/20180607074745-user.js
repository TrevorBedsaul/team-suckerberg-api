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
  db.createTable('user', {
    id: {
      type: 'int',
      autoIncrement: true,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: 'string',
      length: 40,
      notNull: true
    },
    lastname: {
      type: 'string',
      length: 40,
      notNull: true
    },
    email: {
      type: 'string',
      length: 50,
      uniqueIndex: true,
      notNull: true
    },
    password: {
      type: 'string',
      notNull: true
    },
  }, callback);
  return null;
};

exports.down = function (db, callback) {
  db.dropTable('user');
  return null;
};

exports._meta = {
  "version": 1
};
