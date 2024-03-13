
import { type } from "@testing-library/user-event/dist/type";
import { useReducer } from "react";
const intialstate = {count: 0 , step:1 }

function reducer(state , action){
       switch(action.type){
        case  "increment":
          return {...state , count: state.count + state.step};
          case "decrement":
            return {...state , count: state.count - state.step};
            case "setcount":
              return {...state , count: action.payload};
              case "setstep":
                return {...state , step: action.payload};
                case "reset":
                  return intialstate;
              default:
                throw new Error ("unknown action");
       }
      
        }
    
        

function DateCounter() {
 
 const [state , dispatch] = useReducer(reducer , intialstate)

const {count , step} = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    
  dispatch({type:"decrement"})
  };

  const inc = function () {
    dispatch({type:"increment" })
  };

  const defineCount = function (e) {
  dispatch({type: "setcount" , payload: Number(e.target.value)})

  };

  const defineStep = function (e) {
    dispatch({type: "setstep" , payload: Number(e.target.value)});
  };

  const reset = function () {
   dispatch({type: "reset"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
