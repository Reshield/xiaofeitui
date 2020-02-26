const Sequelize = require('sequelize');

const yiyouji = new Sequelize('mysql://root:4107@localhost/yiyouji_test',{
    define:{
        timestamps: false
    }
})

module.exports ={
    yiyouji
}