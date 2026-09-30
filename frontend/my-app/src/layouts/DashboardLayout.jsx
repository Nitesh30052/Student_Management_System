import Sidebar from "../components/Sidebar";
import "../styles/layout.css";

function DashboardLayout({ children }) {
    return (
        <div className="app-layout">

            <div className="app-body">

                <aside className="sidebar-wrapper">
                    <Sidebar />
                </aside>

                <main className="main-content">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;