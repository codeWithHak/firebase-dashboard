const Sidebar = ({ isSidebarOpen, activeTab, setActiveTab, toggleSidebar }) => (
    <div
      className={`w-64 bg-gradient-to-b from-purple-500 to-indigo-600 text-white fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold">My Dashboard</h1>
      </div>
      <nav className="mt-8">
        <SidebarLink
          icon={<FileText className="mr-3 h-5 w-5" />}
          label="Posts"
          activeTab={activeTab}
          tabName="posts"
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
        />
        <SidebarLink
          icon={<Settings className="mr-3 h-5 w-5" />}
          label="Settings"
          activeTab={activeTab}
          tabName="settings"
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
        />
        <SidebarLink
          icon={<LogOut className="mr-3 h-5 w-5" />}
          label="Logout"
          activeTab={activeTab}
          tabName="logout"
          setActiveTab={setActiveTab}
          toggleSidebar={toggleSidebar}
        />
      </nav>
    </div>
  );

  export default Sidebar