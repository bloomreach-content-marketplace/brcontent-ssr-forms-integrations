// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const token = req.query.token
    const query = req.query.query
    if (!token) {
        // @ts-ignore
        res.status(403).json('TOKEN NOT PROVIDED');
    } else {
        const response = await axios.get(`https://api.typeform.com/forms${query ? `?search=${query}` : ''}`, {headers: {"Authorization": `Bearer ${token}`}})
        res.status(response.status).json(response.data)
    }

}
