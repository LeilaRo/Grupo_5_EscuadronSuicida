module.exports = {
  "development": {
    "username": "root",
    "password": '34860444',
    "database": "tierraquemadadb",
    "host": "127.0.0.1",
    "dialect": "mysql",
    define: {
      timestamps: false,
  }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "tierraquemadadb",
    "host": "127.0.0.1",
    "dialect": "mysql",
    define: {
      timestamps: false
  }
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    define: {
      timestamps: false
  }
  }
  
}
