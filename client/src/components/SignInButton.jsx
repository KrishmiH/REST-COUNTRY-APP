// /src/components/SignInButton.jsx

import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function SignInButton() {
  return (
    <Link to="/login">
      <Button
        label="Sign In"
        className="p-button-primary w-full md:w-auto"
      />
    </Link>
  );
}
