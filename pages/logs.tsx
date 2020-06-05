import React from 'react';
import fetch from 'isomorphic-fetch';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Layout from '../components/Layout';

export interface LogProps {
  logs: Log[];
  error: string | null;
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {},
});

const Logs = ({ logs, error }: LogProps) => {
  const classes = useStyles();

  return (
    <Layout title="Logs">
      {logs.map((log) => {
        return (
          <>
            <ExpansionPanel style={{ margin: '1em 0' }}>
              <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
                <Typography>{log.date}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TableContainer style={{ margin: '1em 0' }} component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Time Stamp</StyledTableCell>
                        <StyledTableCell>Path</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {log.images.map((img: any) => (
                        <StyledTableRow key={img.timestamp}>
                          <StyledTableCell component="th" scope="row">
                            {img.timeStamp}
                          </StyledTableCell>
                          <StyledTableCell>{img.path}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </>
        );
      })}
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

const mapStateToProps = (state: any) => {
  return {
    logs: state.logs.logs,
    error: state.error,
  };
};

export default connect(mapStateToProps, null)(Logs);

// <div>
//     <Typography variant="h5">{log.date}</Typography>
//     {log.images.length > 0 && <Typography variant="h3">Image Files Available</Typography>}
//     {log.images.map((img: any) => (
//       <div
//         style={{
//           border: '1px solid white',
//           borderRadius: '20px',
//           padding: '10px',
//           marginBottom: '10px'
//         }}
//       >
//         <p>
//           <strong>{img.timeStamp}</strong> : {img.path}
//         </p>
//       </div>
//     ))}
//   </div>
