const busses = require("./russebusser.json")

// TODO Fix types
const Handler = ({res, req}: {res: any, req: any}) => {
  res.status(200).json(busses)
}

export default Handler;