import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeDashboardPage() {
  const navigate = useNavigate();

  const goToPayment = () => {
    navigate("/employee-payments");
  };

  return (
    <div style={{ padding: "2rem", color: "#f4f4f4", background: "#1e1e2f", minHeight: "100vh" }}>
      <h2 className="center-heading">Welcome, Employee</h2>
      <p>This is your secure dashboard.</p>

      <button type="submit">Go to Payment Page</button>
    </div>
  );
}

export default EmployeeDashboardPage;

