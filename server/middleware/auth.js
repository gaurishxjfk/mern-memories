import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        const customAuth = token.length < 500;
        let decodedData;

        if(token && customAuth){
            decodedData = jwt.verify(token, process.env.SECRET_KEY); //for json token
            req.userID = decodedData?.id
        } else{
            decodedData = jwt.decode(token) // fro google auth token
            req.userID = decodedData?.sub;
        }
        next();

    } catch (error) {
        console.log(error)
    }
}

export default auth;