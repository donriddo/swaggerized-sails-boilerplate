/**
 * development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /**
   * *************************************************************************
   * set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/


  connections: {

    localDiskDB: {
      adapter: 'sails-disk'
    },
    localMongoDB: {
      adapter: 'sails-mongo',
      database: 'swaggerized-sails-boilerplate'
    },
    localTestDiskDB: {
      adapter: 'sails-disk'
    }
  },

  models: {
    connection: 'localDiskDB',
    migrate: 'alter',
    schema: true
  },

  port: 10010,

  settings: {
    jwt: {
      expiry: 108000000,
      secret: process.env.JWT_SECRET || 'Sw4Gger1z3d_S41ls'
    }
  }


};
