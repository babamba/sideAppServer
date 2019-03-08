import Reactotron from "reactotron-react-js"
import { reactotronRedux } from "reactotron-redux"


// https://github.com/infinitered/reactotron/blob/master/docs/installing.md
Reactotron.configure({name: "TodaySalary"}).use(reactotronRedux()).connect();

export default Reactotron;