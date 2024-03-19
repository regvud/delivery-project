import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { statService } from '../services/statService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import css from './styles/AdminPage.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminPage = () => {
  const [stats, setStats] = useState({
    avgPrice: 0,
    totalUsers: 0,
    totalDeliveries: 0,
    todayUsers: 0,
    todayDeliveries: 0,
    prevWeakDeliveries: 0,
    prevWeakUsers: 0,
    currentWeakDeliveries: 0,
    currentWeakUsers: 0,
  });
  const [loader, setLoader] = useState(false);
  async function fetchStats() {
    setLoader(true);
    try {
      const promises = [
        statService.avgPrice().then(({ data }) => data.avg_price),
        statService.totalUsers().then(({ data }) => data.total_users),
        statService.totalDeliveries().then(({ data }) => data.total_deliveries),
        statService.todayDeliveries().then(({ data }) => data.today_deliveries),
        statService.todayUsers().then(({ data }) => data.today_users),
        statService
          .prevWeakDeliveries()
          .then(({ data }) => data.prev_weak_deliveries),
        statService
          .currentWeakDeliveries()
          .then(({ data }) => data.current_weak_deliveries),
        statService.prevWeakUsers().then(({ data }) => data.prev_weak_users),
        statService
          .currentWeakUsers()
          .then(({ data }) => data.current_weak_users),
      ];

      const [
        avgPrice,
        totalUsers,
        totalDeliveries,
        todayDeliveries,
        todayUsers,
        prevWeakDeliveries,
        currentWeakDeliveries,
        prevWeakUsers,
        currentWeakUsers,
      ] = await Promise.all(promises);

      setStats({
        avgPrice,
        totalUsers,
        totalDeliveries,
        todayDeliveries,
        todayUsers,
        prevWeakDeliveries,
        currentWeakDeliveries,
        prevWeakUsers,
        currentWeakUsers,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  function createDataset(
    labels: string[],
    data: number[],
    backgroundColor: string[]
  ) {
    return {
      labels,
      data,
      backgroundColor,
    };
  }

  function createDefault(labels: string[]) {
    return {
      labels: labels,
      datasets: [
        {
          label: 'No data yet',
          data: [1],
          backgroundColor: ['grey'],
        },
      ],
    };
  }

  const datasets = [
    createDataset(
      ['Today Deliveries', 'Today Users'],
      [stats.todayDeliveries, stats.todayUsers],
      ['cyan', 'green']
    ),
    createDataset(
      ['Total Users', 'Total Deliveries'],
      [stats.totalUsers, stats.totalDeliveries],
      ['red', 'blue']
    ),

    createDataset(
      ['Previous weak users', 'Current weak users'],
      [stats.prevWeakUsers, stats.currentWeakUsers],
      ['magenta', 'yellow']
    ),
    createDataset(
      ['Previous weak deliveries', 'Current weak deliveries'],
      [stats.prevWeakDeliveries, stats.currentWeakDeliveries],
      ['purple', 'orange']
    ),
  ];

  if (loader) return <h1>...Loading</h1>;
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.divLink}>
          <NavLink className={css.navlink} to={'users'}>
            Users
          </NavLink>
          <NavLink className={css.navlink} to={'deliveries'}>
            Deliveries
          </NavLink>
        </div>
      </div>

      <div className={css.donuts}>
        {datasets.map((dataset, idx) => {
          if (dataset.data.some((val) => val !== 0)) {
            return (
              <div key={idx} style={{ width: '450px', height: '450px' }}>
                <Doughnut
                  data={{
                    labels: dataset.labels,
                    datasets: [dataset],
                  }}
                />
              </div>
            );
          }
          return (
            <div key={idx} style={{ width: '450px', height: '450px' }}>
              <Doughnut data={createDefault(dataset.labels)} />
            </div>
          );
        })}
      </div>
      {stats.avgPrice && (
        <h1 className={css.avg}>
          Average delivery price: {` ${stats.avgPrice} $`}
        </h1>
      )}
    </div>
  );
};

export { AdminPage };
