import React from "react";

const SECURITY_CODE = "paradigma";

export class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  // UNSAFE_componentWillMount() {}
  // componentDidMount() {}
  componentDidUpdate() {
    const { loading, value } = this.state;
    if (loading) {
      // this.setState({ error: false });
      setTimeout(() => {
        console.log("Comenzando la validación");

        if (SECURITY_CODE === value) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ loading: false, error: true, });
        }

        console.log("Terminando la validación");
      }, 3000);
    }
  }

  render() {
    const { error, loading, value } = this.state;
    const { name } = this.props;
    return (
      <>
        <h1>Eliminar {name}</h1>
        <p>Por favor, escribe el código de seguridad.</p>
        {(error && !loading) && <p>Error: el codigo es incorrecto</p>}
        {loading && <p>Cargando...</p>}
        <input
          value={value}
          onChange={(event) => this.setState({ value: event.target.value })}
          placeholder="Código de seguridad"
        />
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </>
    );
  }
}
