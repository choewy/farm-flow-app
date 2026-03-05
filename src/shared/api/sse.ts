import { useEffect, useState } from 'react';

export function useSse<T = unknown>(url: string) {
  const [data, setData] = useState<T>();

  useEffect(() => {
    const eventSource = new EventSource(url, { withCredentials: true });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };

    return () => {
      eventSource.close();
    };
  }, [url, setData]);

  return data;
}
