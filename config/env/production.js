/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  connections: {
    localDiskDb: {
      adapter: 'sails-disk'
    },
    someMongodbServer: {
      adapter: 'sails-mongo',
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      database: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASS,
    },
  },
  session: {
    secret: 'e9393f7014364308a208735920dbfba7',
    adapter: 'mongo',
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    db: process.env.MONGO_DB,
    collection: 'sessions',
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    auto_reconnect: true,
    ssl: false,
    stringify: true
  },
  log: {
    level: 'error'
  }
};
