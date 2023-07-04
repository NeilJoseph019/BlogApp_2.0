# Simple Blog Application using React and Django
### (For practicing few of the advanced topics in React)

Technologies used for this project are:
1. React
2. Redux-toolkit
3. Django
4. Django Rest Framework
5. Simple JWT authentication
6. Bootstrap 5
----------------------------------------------------------------------------------------------------------------------------
#### Screenshots of the project:
1. Welcome Page

![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-1.png)

2. Register Page
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-2.png)

3. Login Page
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-3.png)

4. Home Page
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-4.png)

5. Post Example 1
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-5.png)

6. Post Example 2
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-6.png)

7. Your Posts Page
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-7.png)

8. Your Post Example
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-8.png)

9. Post Edit(Delete and Update post) Functionality
![alt text](https://github.com/NeilJoseph019/BlogApp_2.0/blob/3c7c09fc86db99084c3927195f3d87d25bb31a46/Images/Screenshot-9.png)

----------------------------------------------------------------------------------------------------------------------------
### Stuff learnt while doing this project: (Espically state management for the project)

#### 1. "useReducer" hook for the register page for state management: (Low Level)

  ##### `Step 1`
  * Import `useReducer` from react.
    ```
    import React, {useReducer} from 'react'
    ```
  ##### `Step 2`
  * Inside the component function, the following code is typed:
    ```
    const [loginInputState, dispatchLoginActions] = useReducer(loginInputReducer, initialLoginInputState)
    ```
  ##### `Step 3`
  * Initialize the initial values for the states: 
    ```
    const initialLoginInputState = {
        first_name : '',
        last_name : '',
        username : '',
        email : '',
        password : '',
        confirm_password : ''
    }
    ```
 * This constant can be typed above and outside the component function, right below the import statements.
  ##### `Step 4`
  * The following is the reducer fucntion, that contains the state object and an action (which contains action.type and action.payload):
    ```
    const loginInputReducer = (state, action) =>{
        if (action.type === "FIRST_NAME"){
            return {
            ...state,
            first_name : action.payload
            }
        }
        if (action.type === "LAST_NAME"){
            return {
            ...state,
            last_name : action.payload
            }
        }
        if (action.type === "USER_NAME"){
            return {
            ...state,
            username : action.payload
            }
        }
        if (action.type === "EMAIL"){
            return {
            ...state,
            email : action.payload
            }
        }
        if (action.type === "PASSWORD"){
            return {
            ...state,
            password : action.payload
            }
        }
        if (action.type === "CONFIRMED_PASSWORD"){
            return {
            ...state,
            confirm_password : action.payload
            }
        }
    }
    ```
  * The each condition will return back an object, that has some intentention to make changes to the initial state values mentioned in the `initialLoginInputState`.
  * `...state` will allow to retain the other values of the other states, simultainously changing only the value of the state that needs to be changed in this condition. If this is not done then the state will not be able to retain the values of the other stated , and therefore remove all the initial or changed values of the other states and only make changes the the that state that's updated in that specific condition's return object.

  ##### `Step 5`
  * The following is an example of how a action is dispatched in-order to update the value of the state:
    ```
    <Form.Control 
        type="text" 
        placeholder="John"
        value={loginInputState.first_name} 
        onChange={(e)=> {dispatchLoginActions({type: "FIRST_NAME", payload: e.target.value})}}
        />
    ```1
  * The `type` will allows to distinguish the different functionalities to be performed in order to update the values of the required specific states.


#### 2. "useContext" hook that can also be used as an alternative for state management for small projects: (Medium Level)

  ##### `Step 1`
  * First, in `AuthContext.js` import the ``createContext` from `react`:
  * This is what helps create and handle all the work for using `context` for the project.
    ```
    import { createContext } from 'react'
    ```
  * Then initialize the createContext by assigning it to a constant variable.
    ```
    const authContext = createContext({})
    ```
  ##### `Step 2`
  * Create a `provider`, that will allow the use of the states and assigning state value function for the project.
    ```
    export const AuthContextProvider = ({children})=>{  // This must start with a Capital letter as it will be used as a component in index.js
        const [tokens, setTokens] = useState()
        const [user, setUser] = useState()
    
        return(
            <authContext.Provider value={{tokens, user, setTokens, setUser}}>
                {children}
            </authContext.Provider>
        )
    }
    
    export default authContext
    ```
  * To know:
      * Although, this is a `bit higher than` that of `useReducer`, it's still recommended to use this for small or medium level projects and not large scale projects.
      * The `{children}` is used to de-structure the `props` passed in, in this case it will be the `<App/>` (will come up on later stages). This can also be typed as `{props.children}` or `const { children } = props`.
      * The `provider` is provided by the object of the `createContext()` which is contained by the constant `authContext`, and can be used as `authContext.Provider`.
      * The `authContext.Provider` will require a `value` prop passed to it, which basically helps us to access all the current states and the function that assignes the state values to any component where `authContext` is called with the help of `useContext` hook.

  ##### `Step 3`
  * In `Index.js`, import the `provider` created in `authContext.js`:
    ```
    import {AuthContextProvider} from './context/AuthContext'
    ```
  * Now, wrap all the components that will need the access to the state and it's state update function.
    ```
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    ```
  ##### `Step 4`
    * In `Component.js`, import `useContext` which will help pull all the props that were passed through the `authContext.Provider`, in other words `AuthContextProvider` in the `index.js`.
      ```
      import React, {useContext} from 'react'
      ```
    * Now import the `authContext` from `AuthContext.js`:
      ```
      import authContext from '../../context/AuthContext'
      ```
    ```
  ##### `Step 5`
    * Now as-per the requirement, we can call the state or its state update functions, by destructuring them.
      ```
      const { tokens, user, setTokens, setUser} = useContext(authContext)
      ```

#### 3. Redux-Toolkit state management for small and large projects: (High Level)

  * To know:
      * This is basically 'useContext' state management on  a bit of steroids.
      * There are also other state management tools such as React Query, Apollo Client or Mobx.

  ##### `Step 1`
  * Create a folder named `slice` inside the `src` folder.
    * The `slice` folder can contain as many different slices as required for the project.
      
  ##### `Step 2`
  * Create a file `userTokenSlice.js` inside the `slice` folder.
  * The code below is typed in the `userTokenSlice.js` file:
    ```
    import { createSlice } from '@reduxjs/toolkit'
    
    const initialState = {
      access : '',
      refresh : ''
    }
    
    const userTokenSlice = createSlice({
        name: 'userTokens',
        initialState,
        reducers: {
          accessToken : (state, action)=>{
            state.access = action.payload
          },
          refreshToken : (state, action)=>{
            state.refresh = action.payload
          }
    
        },
      })
    
    export const { accessToken, refreshToken } = userTokenSlice.actions
      
    export default userTokenSlice.reducer
    ```
  * To Know:
    * All the `values` inside the `reducers: {}` are the same as the blocks inside the `reducer` function used in the `useReducer` hook.
    * At the same time, the `keys`  inside the `reducers: {}` function are the same as the `constants` such as `ACTION_TOKEN` and `REFRESH_TOKEN` that are usually used in the `conditional statements` in the `useReducer` hook.
    * The `keys` will act as actions which can be exported as `export const { accessToken, refreshToken } = userTokenSlice.actions`, these can be later be called in the components using the `useDispatch` hook.
    * The constant `userTokenSlice` will act as the overall reducer for this particular slice that the `store` in `store.js` will recognise.
        
  ##### `Step 3`
  * Create a file named `store.js` inside the `src` folder.
  * The code below is typed in the `store.js`:
    ```
    import { configureStore } from '@reduxjs/toolkit'
    import userTokenReducer from './slices/userToken/userTokenSlice'
    
    const store = configureStore({
      reducer: {
        tokens : userTokenReducer,
      },
    })
    
    export default store
    ```
  * To Know:
    *  This `import userTokenReducer from './slices/userToken/userTokenSlice' ` code will import the reducer from `userTokenSlice.js`, that is `export default userTokenSlice.reducer`.
    *  The `userTokenReducer` in `import userTokenReducer from './slices/userToken/userTokenSlice' ` can be named anything as per your understanding of the functionality.
    *  The `key` - `tokens` inside `reducer: {}` can be later used to access the `initial_states` from the `userTokenReducer` inside the components using the `useSelector` hook.
   
  ##### `Step 4`
  * Now in `index.js`, add the following code:
    ```
    import store from './store'
    import { Provider } from 'react-redux'
    ```
  * Wrap the app component with the `provider`, so that `the store is available throughout the project`:
    ```
    <Provider store = {store}>
    <App/>
    </Provider>
    ```
      
  ##### `Step 5`
  * In Login.js, add the following code:
    ```
    import { useDispatch } from 'react-redux'
    import { accessToken, refreshToken } from '../../slices/userToken/userTokenSlice'
    ```
  *Inside the Login function:
    ```
    const dispatch = useDispatch()
    ```
  * The `dispatch` const is used to dispatch the actions from userTokenSlice:
    ```
    const response = await axios.post('api/users/token/', loginDetails, config)
            if (response.status === 200){
                dispatch(accessToken(response.data.access))
                dispatch(refreshToken(response.data.refresh))
                navigate('/home')
            }
    ```
    * To know:
      * Anything passed to the `action` will be passed in as the `action-payload`.

 ##### `Step 6`
  * `To access` any of the `state values`, first import `useSelector` hook:
    ```
    import { useSelector } from 'react-redux'
    ```
  * Then:
    ```
    const {access} = useSelector(state => state.tokens)
    ```

