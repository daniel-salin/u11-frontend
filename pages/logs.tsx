import React from 'react';
import fetch from 'isomorphic-fetch';
import { Typography } from '@material-ui/core';
import Layout from '../components/Layout';

export interface LogProps {
  logs: Log[];
  error: string | null;
}

const Logs = ({ logs, error }: LogProps) => {
  return (
    <Layout title="Logs">
      {!error ? (
        <>
          <Typography variant="h4">Logs found for the following dates:</Typography>
          {logs.map((log) => (
            <div>
              <Typography variant="h5">{log.date}</Typography>
              {log.images.length > 0 && <Typography variant="h3">Image Files Available</Typography>}
              {log.images.map((img: any) => (
                <div
                  style={{
                    border: '1px solid white',
                    borderRadius: '20px',
                    padding: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <p>
                    <strong>{img.timeStamp}</strong> : {img.path}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <Typography variant="h4">{error}</Typography>
      )}
    </Layout>
  );
};

export interface Log {
  date: string;
  images: LogImages[];
}

export interface LogImages {
  timestamp: string;
  path: string;
}

Logs.getInitialProps = async () => {
  if (process.env.AUTH_0_AUDIENCE && process.env.AUTH_0_AUDIENCE!.length > 0) {
    try {
      const res = await fetch(process.env.AUTH_0_AUDIENCE);
      const data: Log = await res.json();
      return { logs: data };
    } catch (error) {
      return {
        logs: [],
        error: 'There was an error accessing the API, make sure the unit is active',
      };
    }
  } else return { logs: [], error: 'API Endpoint not set' };
};

export default Logs;
