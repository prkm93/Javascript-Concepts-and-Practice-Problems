import './App.css';
import Chart from './Chart';
import CHART_DATA from './data';

function App() {
  const totalTicketCount = CHART_DATA.reduce(
    (total, item) => total + item.ticketCount,
    0
  );

  const maxValue = Math.max.apply(
    null,
    CHART_DATA.map((item) => item.ticketCount)
  );

  const percMaxTicket = (maxValue / totalTicketCount) * 100;

  return (
    <main className="bar-charts">
      <div className="y-label">&larr; Number of Tickets </div>
      <div
        className="bar-yAxis"
        style={{ height: `${percMaxTicket * 10}px` }}></div>
      <div>
        <div className="chart">
          {CHART_DATA.map((item) => {
            const { id, name, ticketCount, colour } = item;
            return (
              <Chart
                key={id}
                colour={colour}
                name={name}
                ticketCount={ticketCount}
                percTicket={(ticketCount / totalTicketCount) * 100}
              />
            );
          })}
        </div>
        <div
          className="bar-xAxis"
          style={{ width: `${CHART_DATA.length} * 50px` }}>
          Departments &rarr;
        </div>
      </div>
    </main>
  );
}

export default App;
