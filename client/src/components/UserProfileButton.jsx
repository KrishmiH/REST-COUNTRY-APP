// /src/components/UserProfileButton.jsx

import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function UserProfileButton() {
  return (
    <Link to="/profile">
      <Button
        icon="pi pi-user"
        className="p-button-rounded p-button-primary p-button-outlined"
        aria-label="Profile"
      />
    </Link>
  );
}
