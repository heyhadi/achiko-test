'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'firstName is required'
        }
      }
    },
    lastName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'lastName is required'
        }
      }
    },
    userName: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'username is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'email is required'
        },
        isEmail: {
          msg: 'must be an email format'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'password is required'
        }
      }
    },
    city: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'city is required'
        }
      }
    },
    gender: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'gender is required'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user){
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};