import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Dashboard'],
  ['/ingest', 'Ingest'],
  ['/meters', 'Meters'],
  ['/vehicles', 'Vehicles'],
  ['/vehicle-analytics', 'Vehicle analytics'],
  ['/fleet', 'Fleet'],
  ['/alerts', 'Alerts'],
  ['/exports', 'Exports'],
  ['/audit', 'Audit'],
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">GP</div>
      <nav>
        {links.map(([href, label]) => (
          <NavLink key={href} to={href}>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
