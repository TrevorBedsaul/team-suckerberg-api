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
  db.createTable('post', {
    id: {
      type: 'int',
      primaryKey: true
    },
    name: {
      type: 'string',
      length: 50
    },
    body: {
      type: 'string',
      length: 20
    },
    project_id: {
      type: 'int'
    },
  }, callback);
  return null;
};

exports.down = function (db, callback) {
  db.dropTable('post');
  return null;
};

exports._meta = {
  "version": 1
};
