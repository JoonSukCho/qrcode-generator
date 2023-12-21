import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === 'GET') {
    const { originUrl } = req.query;

    const naverClientId =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
        : process.env.NAVER_CLIENT_ID;

    const naverClientSecret =
      process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
        : process.env.NAVER_CLIENT_SECRET;


    try {
      const urlRes = await axios.get(
        'https://openapi.naver.com/v1/util/shorturl',
        {
          headers: {
            'X-Naver-Client-Id': naverClientId,
            'X-Naver-Client-Secret': naverClientSecret,
          },
          params: { url: originUrl },
        }
      );

      res.status(200).json(urlRes.data);
    } catch (error) {
      res.status(400).json({
        path: '/url-short',
        message: 'Server Error',
        error,
      });
    }
  }
};

export default handler;
