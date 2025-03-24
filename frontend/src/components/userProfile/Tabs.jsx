import React from 'react';

export const TabList = ({ children }) => (
  <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
    {children}
  </div>
);

export const Tab = ({ children, active, onClick }) => (
  <button
    className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
      active
        ? 'border-orange-500 text-orange-500'
        : 'border-transparent text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabPanel = ({ children, active }) => (
  <div className={active ? 'block' : 'hidden'}>{children}</div>
);

export const Tabs = ({ children, activeTab, onChange }) => {
  const tabs = React.Children.toArray(children);
  const tabList = tabs.find(child => child.type === TabList);
  const tabPanels = tabs.filter(child => child.type === TabPanel);

  return (
    <div>
      {React.cloneElement(tabList, {
        children: React.Children.map(tabList.props.children, (child, index) =>
          React.cloneElement(child, {
            active: index === activeTab,
            onClick: () => onChange(index)
          })
        )
      })}
      {React.Children.map(tabPanels, (child, index) =>
        React.cloneElement(child, {
          active: index === activeTab
        })
      )}
    </div>
  );
};