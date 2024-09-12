import React, { useReducer } from 'react'
import { useImmerReducer } from "use-immer";

const Test = () => {
  const initialState = {
    appleCount: 1,
    bananaCount: 10,
    message: "Hello",
    happy: false
  };

  const reducerFunction = (draft, action) => {
    switch (action.type) {
      case "addApple":
        draft.appleCount = draft.appleCount + 1;
        break;
      case "changeEverything":
        draft.bananaCount = draft.bananaCount + 10;
        draft.message = action.customMessage;
        draft.happy = true;
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(reducerFunction, initialState);
  return (
    <div>
        <p>Right now the count of apple is {state.appleCount}</p>
        <p>Right now the count of bananas is {state.bananaCount}</p>
        <p>Right now the message {state.message}</p>
        {state.happy ? <h1>Thanks for being happy.</h1> : <h1>There is no happiness.</h1>}
        <br />
        <button onClick={() => dispatch({type: "addApple"})}>Add Apple</button>
        <br />
        <button onClick={() => dispatch({type: "changeEverything", customMessage: "The message is now coming from the dispatch"})}>Change Everything</button>
    </div>
  )
}

export default Test