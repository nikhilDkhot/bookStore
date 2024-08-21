import jwt from 'jsonwebtoken';
import config from '../config/config';

class Utils {
    private secreat_key = config.development.secreat;

    public getToken = async (id, role) => {
        let token = await jwt.sign({ id: id, role: role }, this.secreat_key, { expiresIn: '1h' });
        //console.log(token , "  *****");

        return token;
    }


}

export default Utils;