import { useReducer, useEffect } from "react";

const SECURITY_CODE = "paradigma";

const initialState = {
  error: false,
  loading: false,
  value: "",
  deleted: false,
  confirmed: false,
};

export const UseReducer = ({ name }) => {
  //Estados compuestatos
  const [state, dispatch] = useReducer(reducer, initialState)

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onDeleted = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onCheck = () => dispatch({ type: actionTypes.check });

  const onWrite = ({ target: { value }}) => {
    dispatch({ type: actionTypes.write, payload: value });
  }

  useEffect(() => {
    const { loading, value } = state;

    if (loading) {
      setTimeout(() => {
        if (value.toLowerCase() === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 3000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <>
        <h1>Eliminar {name}</h1>
        <p>Por favor, escribe el código de seguridad.</p>
        {(state.error && !state.loading) && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input value={state.value} 
          onChange={onWrite} 
          placeholder="Código de seguridad" 
        />
        <button onClick={onCheck}>Comprobar</button>
      </>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <h1>Eliminar UseState</h1>
        <p>¿Seguro que quieres eliminar UseState?</p>
        <button onClick={onDeleted} >Si, eliminar</button>
        <button onClick={onReset} >No, volver</button>
      </>
    );
  } else {
    return (
      <>
        <h1>UseState fue eliminado</h1>
        <button onClick={onReset}>Recuperar UseState</button>
      </>
    );
  }
};

const actionTypes = {
  confirm: "CONFIRM",
  error: "ERROR",
  write: "WRITE",
  check: "CHECK",
  delete: "DELETE",
  reset: "RESET",
}

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.delete]: {
    ...state,
    confirmed: false,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.check]: {
    ...state,
    loading: true,
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}




// const reducer = (state, action) => {};

// const reducerIf = (state, action) => {
//   if (action.type === "ERROR") {
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     };
//   } else if (action.type === "CHECK") {
//     return {
//       ...state,
//       loading: true,
//     }
//   } else {
//     return {
//       ...state
//     }
//   }
// }

// const reducerSwitch = (state, action) => {
//   switch (action.type) {
//     case "ERROR":
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };
//     case "CHECK":
//       return {
//         ...state,
//         loading: true,
//       };
//     default:
//       return {
//         ...state,
//       };
//   }
// };

