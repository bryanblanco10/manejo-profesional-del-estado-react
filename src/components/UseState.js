import { useState, useEffect } from "react";

const SECURITY_CODE = "paradigma";

export const UseState = ({ name }) => {
  // const [value, setValue] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  //Estados compuestatos
  const [state, setState] = useState({
    error: false,
    loading: false,
    value: "",
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  }

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  }

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue,
    });
  }

  const onDeleted = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: true,
    });
  }

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  }

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
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
  }, [state.loading, state.value]);

  if (!state.deleted && !state.confirmed) {
    return (
      <>
        <h1>Eliminar {name}</h1>
        <p>Por favor, escribe el código de seguridad.</p>
        {(state.error && !state.loading) && <p>Error: el codigo es incorrecto</p>}
        {state.loading && <p>Cargando...</p>}
        <input value={state.value} onChange={(event) => onWrite(event.target.value)} placeholder="Código de seguridad" />
        <button onClick={() => onCheck()}>Comprobar</button>
      </>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <h1>Eliminar UseState</h1>
        <p>¿Seguro que quieres eliminar UseState?</p>
        <button onClick={() => onDeleted()}>Si, eliminar</button>
        <button onClick={() => onReset()}>No, volver</button>
      </>
    );
  } else {
    return (
      <>
        <h1>UseState fue eliminado</h1>
        <button onClick={() => onReset()}>Recuperar UseState</button>
      </>
    );
  }
};
