'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	 await queryInterface.createTable('users', {
			user_id:{
				type: Sequelize.DataTypes.UUID,
				unique: true,
				allowNull: false,
				primaryKey:true,
			},
			firstname:{
				type: Sequelize.DataTypes.STRING,
				allowNull: true
			},
			email:{
				type: Sequelize.DataTypes.STRING,
				allowNull: true
			},
			mobilenumber:{
				type: Sequelize.DataTypes.STRING, 
				allowNull: true,
			},
			status:{
				type: Sequelize.DataTypes.SMALLINT,
				allowNull: true
			},
			device_id:{
				type: Sequelize.DataTypes.INTEGER,
				allowNull: true,
			},
			otp:{
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
			address:{
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
			image:{
				type: Sequelize.DataTypes.SMALLINT,
				allowNull: true,
			},
			auth_token:{
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
			is_register:{
				type: Sequelize.DataTypes.SMALLINT, // 0=inactive,1=active
				allowNull: true,
			},
			createdAt:{
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt:{
				allowNull: false,
				type: Sequelize.DATE
			},
			
	});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('users');
  }
};
