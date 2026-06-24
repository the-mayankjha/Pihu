import * as React from 'react';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  style?: React.CSSProperties;
}

export function Table<T>({ data, columns, className = '', style }: TableProps<T>) {
  return (
    <div 
      className={`pihu-glass-level-2 ${className}`}
      style={{
        width: '100%',
        overflowX: 'auto',
        borderRadius: 'var(--pihu-radius-lg, 12px)',
        ...style
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid color-mix(in srgb, var(--pihu-text) 10%, transparent)', background: 'color-mix(in srgb, var(--pihu-bg) 40%, transparent)' }}>
            {columns.map((col) => (
              <th key={col.key} style={{ padding: '16px', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'color-mix(in srgb, var(--pihu-text) 70%, transparent)' }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr 
              key={i} 
              style={{ borderBottom: i === data.length - 1 ? 'none' : '1px solid color-mix(in srgb, var(--pihu-text) 5%, transparent)' }}
            >
              {columns.map((col) => (
                <td key={col.key} style={{ padding: '16px', fontSize: '14px' }}>
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
