import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { statService } from '../services/statService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const [avgPrice, setAvgPrice] = useState<number>();
  const [totalUsers, setTotalUsers] = useState<number>();
  const [totalDeliveries, setTotalDeliveries] = useState<number>();
  const [todayUsers, setTodayUsers] = useState<number>();
  const [todayDeliveries, setTodayDeliveries] = useState<number>();
  const [prevWeakDeliveries, setPrevWeakDeliveries] = useState<number>();
  const [prevWeakUsers, setPrevWeakUsers] = useState<number>();
  const [currentWeakDeliveries, setCurrentWeakDeliveries] = useState<number>();
  const [currentWeakUsers, setCurrentWeakUsers] = useState<number>();

  async function fetchStats() {
    await statService
      .avgPrice()
      .then(({ data }) => setAvgPrice(data.avg_price));
    await statService
      .totalUsers()
      .then(({ data }) => setTotalUsers(data.total_users));
    await statService
      .totalDeliveries()
      .then(({ data }) => setTotalDeliveries(data.total_deliveries));
    await statService
      .todayDeliveries()
      .then(({ data }) => setTodayDeliveries(data.today_deliveries));
    await statService
      .todayUsers()
      .then(({ data }) => setTodayUsers(data.today_users));
    await statService
      .prevWeakDeliveries()
      .then(({ data }) => setPrevWeakDeliveries(data.prev_weak_deliveries));
    await statService
      .currentWeakDeliveries()
      .then(({ data }) =>
        setCurrentWeakDeliveries(data.current_weak_deliveries)
      );
    await statService
      .prevWeakUsers()
      .then(({ data }) => setPrevWeakUsers(data.prev_weak_users));
    await statService
      .currentWeakUsers()
      .then(({ data }) => setCurrentWeakUsers(data.current_weak_users));
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const total = {
    labels: ['Total Users', 'Total Deliveries'],
    datasets: [
      {
        label: 'Count',
        data: [totalUsers, totalDeliveries],
        backgroundColor: ['red', 'blue'],
      },
    ],
  };
  const today = {
    labels: ['Today Users', 'Today Deliveries'],
    datasets: [
      {
        label: 'Count',
        data: [todayUsers, todayDeliveries],
        backgroundColor: ['pink', 'cyan'],
      },
    ],
  };

  const users = {
    labels: ['Previous weak users', 'Current weak users'],
    datasets: [
      {
        label: 'Count',
        data: [prevWeakUsers, currentWeakUsers],
        backgroundColor: ['green', 'orange'],
      },
    ],
  };
  const deliveries = {
    labels: ['Previous weak deliveries', 'Current weak deliveries'],
    datasets: [
      {
        label: 'Count',
        data: [prevWeakDeliveries, currentWeakDeliveries],
        backgroundColor: ['purple', 'yellow'],
      },
    ],
  };

  return (
    <div>
      <NavLink to={'users'}>Users</NavLink>
      <NavLink to={'deliveries'}>Deliveries</NavLink>
      <div style={{ width: 500, height: 480, display: 'flex' }}>
        <Doughnut data={total} key={1} />
        <Doughnut data={today} key={2} />
        <Doughnut data={deliveries} key={3} />
        <Doughnut data={users} key={4} />
      </div>
    </div>
  );
};

export { AdminPage };
