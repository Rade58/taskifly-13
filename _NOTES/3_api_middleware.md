# How to implement middleware in Nextjs API route

<https://stackoverflow.com/questions/65348127/protect-api-routes-with-nextjs-and-passport-req-user-undefined>

```ts
import type {NextApiRequest, NextApiRequest, NextApiResponse} from 'next';
import {getUser} from '../db';

const withUser = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
  ) => {

    // DO STUFF 
    // FETCH USER, INSERT USER ON REQUEST 
    
    const user = await getUser();

    // IF THERE IS NO USER SEND 401
    if(!user){
      res.status(401);
      res.end();
      return;
    }

    req.user = user;


    // CALL THE HANDLER WITH req AND res
    return handler(req, res);

  };


export default withUser;


```