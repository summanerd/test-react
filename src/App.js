import { useCallback, useState } from 'react';
import './App.css';

const initialState = {
  firstName: '',
  email: ''
};

const isValid = ({ firstName, email }) => !!(firstName && email) && firstName.length > 2 && email.match(/@\w+\.com$/);

function App({onSubmit}) {
  const [formValues, setFormValues] = useState(initialState);
  const isSubmitDisabled = !isValid(formValues);
  const onChange = useCallback((e, prop)=> setFormValues((prev)=>({...prev, [prop]: e.target.value})), [setFormValues])

  return (
    <div className="App">
      <header className="App-header">
        <h2>Test React</h2>
      </header>
      <main>
        <form data-testid="form" onSubmit={()=>onSubmit(formValues)}>
          <input type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={event => onChange(event, 'firstName')}
            data-testid="firstName" />
          <input type="email"
            name="email"
            value={formValues.email}
            onChange={event => onChange(event, 'email')}
            data-testid="email" />
          <button type="submit" disabled={isSubmitDisabled} >Submit</button>
        </form>
      </main>
    </div>
  );
}

export default App;
