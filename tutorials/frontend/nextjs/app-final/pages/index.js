import Header from '../components/Header'
import Login from "../components/Auth/Login";
import TodoPrivateWrapper from "../components/Todo/TodoPrivateWrapper";
import TodoPublicWrapper from "../components/Todo/TodoPublicWrapper";
import OnlineUsersWrapper from "../components/OnlineUsers/OnlineUsersWrapper";

import { useFetchUser } from '../lib/user'
import { withApollo } from '../lib/withApollo'

const IndexPage = () => { 
  const { user, loading } = useFetchUser({required: true})
  if (!loading && !user) {
    return <Login />
  }
  return(
    <div>
      <Header />
      <div className="row container-fluid p-left-right-0 m-left-right-0">
        <div className="row col-md-9 p-left-right-0 m-left-right-0">
          <div className="col-md-6 sliderMenu p-30">
            <TodoPrivateWrapper />
          </div>
          <div className="col-md-6 sliderMenu p-30 bg-gray border-right">
            <TodoPublicWrapper />
          </div>
        </div>
        <div className="col-md-3 p-left-right-0">
          <div className="col-md-12 sliderMenu p-30 bg-gray">
            <OnlineUsersWrapper />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withApollo({ ssr: true })(IndexPage)

// enable the line below for client side rendering of <TodoPrivateWrapper />
// export default withApollo()(IndexPage)
