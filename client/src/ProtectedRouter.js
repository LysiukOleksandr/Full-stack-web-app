import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const ProtectedRouter = ({isAuth, component: Component, ...rest}) =>{
    return(
        <Route
            {...rest}
            render={(props)=>{
                if(isAuth){
                    return <Component location={props.location} match={props.match}/>
                }else{
                    return(
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )
                }
            }}
        />
    )
}

export default ProtectedRouter