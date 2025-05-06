// /src/components/SignUpButton.jsx

import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function SignUpButton() {
  return (
    <Link to="/register">
      <Button
        label="Sign Up"
        className="p-button-outlined p-button-primary w-full md:w-auto"
      />
    </Link>
  );
}
