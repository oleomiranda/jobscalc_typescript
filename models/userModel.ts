import { Sequelize, Model, DataTypes, ModelStatic, Association, HasManyAddAssociationMixin } from "sequelize";
import {sequelize} from "./"
import job from "./jobModel";

class user extends Model {
	readonly id!: string;
	name!: string;
	avatar!: string;
	monthlyBudget!: number;
	hoursPerDay!: number;
	daysPerWeek!: number;
	vacationPerYear!: number;
	hourPrice!: number;

	
	public static initialize(sequelize: Sequelize){
		this.init({
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			avatar: {
				type: DataTypes.STRING,
				allowNull: false
			},
			monthlyBudget: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			hoursPerDay:{
				type: DataTypes.INTEGER,
				allowNull: false
			},
			daysPerWeek:{
				type: DataTypes.INTEGER,
				allowNull: false
			},
			vacationPerYear:{
				type: DataTypes.INTEGER,
				allowNull: false
			},
			hourPrice:{
				type: DataTypes.INTEGER,
				allowNull: false
			}
		}, {sequelize: sequelize, 
			timestamps: false,
			freezeTableName: true
		})
	}

}



export default user