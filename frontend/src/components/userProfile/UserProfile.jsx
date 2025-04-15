import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';
import OrderHistory from './OrderHistory';
import AddressManager from './AddressManager';
import PasswordUpdate from './PasswordUpdate';
import Sidebar from './Sidebar';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfo />;
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <AddressManager />;
      case 'password':
        return <PasswordUpdate />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
