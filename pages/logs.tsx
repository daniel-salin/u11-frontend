import React from 'react';
import { Typography } from '@material-ui/core';
import Link from 'next/link';
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
      {logs ? (
        logs?.map((log) => {
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
                        {log.images?.map((img: any) => (
                          <StyledTableRow key={img.timestamp}>
                            <StyledTableCell component="th" scope="row">
                              <Link
                                href={{
                                  pathname: '/image',
                                  query: { path: `${img.path}` },
                                }}
                              >
                                <a>{img.timeStamp}</a>
                              </Link>
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
        })
      ) : (
        <Typography>No Logs Available</Typography>
      )}
    </Layout>
  );
};

export interface LogProps {
  logs: Log[];
  error: string | null;
}

export interface Log {
  date: string;
  images: LogImages[];
}

export interface LogImages {
  timestamp: string;
  path: string;
}

export interface State {
  logs: { logs: Log[] };
  error: string;
}

const mapStateToProps = (state: State) => {
  return {
    logs: state.logs.logs,
    error: state.error,
  };
};

export default connect(mapStateToProps, null)(Logs);
