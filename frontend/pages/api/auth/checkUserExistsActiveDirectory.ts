// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { CLIENTID, CLIENTSECRET } from "../../../utils/constants";

type Data = {
  result: boolean;
};

const checkUserExistsInActiveDirectory = async (email: string) => {
  if (CLIENTID && CLIENTSECRET) {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", CLIENTID);
    params.append("client_secret", CLIENTSECRET);
    params.append("scope", "https://graph.microsoft.com/.default");

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const { data: tokenData } = await axios.post(
      `https://login.microsoftonline.com/d0c2e120-f8d6-4e49-a2e6-ca01871371cd/oauth2/v2.0/token`,
      params,
      config
    );

    const { access_token: accessToken } = tokenData;

    const { data } = await axios.get(
      `https://graph.microsoft.com/v1.0/users?$search="mail:${email}" OR "displayName:${email}" OR "userPrincipalName:${email}"&$orderbydisplayName&$count=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ConsistencyLevel: "eventual",
        },
      }
    );

    const count = data["@odata.count"];
    for (let i = 0; i < count; i++) {
      const user = data.value[i];
      if (user.mail && user.mail.toLowerCase() === email.toLowerCase()) {
        return true;
      }
      if (user.displayName && user.displayName.toLowerCase() === email.toLowerCase()) {
        return true;
      }
      if (user.userPrincipalName && user.userPrincipalName.toLowerCase() === email.toLowerCase()) {
        return true;
      }
    }
  }

  return false;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const result = await checkUserExistsInActiveDirectory(req.body.email);
  res.status(200).json({ result });
};

export default handler;
