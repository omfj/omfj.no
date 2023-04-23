import {NextApiHandler} from "next";

const handler: NextApiHandler = (_, res) => {
  res.setPreviewData({});
  res.writeHead(307, {Location: "/"});
  res.end();
};

export {handler as GET, handler as POST};
