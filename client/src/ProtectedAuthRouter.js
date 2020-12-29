import React from 'react'
import {Route, Redirect} from 'react-router-dom'
const ProtectedAuthRouter = ({isAuth, component: Component, ...rest}) =>{
    return(
        <Route
            {...rest}
            render={(props)=>{
                if(isAuth){
                    return(
                        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    )
                }else{
                    return <Component/>
                }
            }}
        />
    )
}

export default ProtectedAuthRouter