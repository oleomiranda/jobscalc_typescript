import { Sequelize} from "sequelize";
import config  from "../config.json"
const sequelize = new Sequelize(config.database.url)
import user from "./userModel";
import job from "./jobModel"


user.initialize(sequelize)
job.initialize(sequelize)


//sequelize.sync({force: true})


export {sequelize, user as userModel, job as jobModel}